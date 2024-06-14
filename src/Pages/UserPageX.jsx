import React, { useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import UserDataTable from '../components/UserDataTable';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';


const UserPageX = () => {
    const [user, loading] = useAuthState(auth);
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const navigate = useNavigate(); 
    const fetchUserData = () => {
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultRef
        .where('userId', '==', uid)
        .get()
        .then((snapshot) => {
             snapshot.docs.map((doc) => {
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp, doc.data().wpm]);
            //     const { timeStamp, wpm } = doc.data();
            //         tempData.push({ ...doc.data() });
            //         tempGraphData.push([
            //             timeStamp.toDate().toLocaleString().split(','),
            //             0,
            //             wpm
            //         ]);
            });
            setData(tempData);
            setGraphData(tempGraphData);
        }) 
    }
    useEffect(() => {
        if(!loading){
            fetchUserData();
        }
        if(!loading && !user){
            navigate('/');
        }
    },[loading])

    if(loading){
        <CircularProgress/>
    }
  return (
    <div className='canvas'>
        <UserInfo totalTestTaken = {data.length}/>
        <Graph graphData={graphData}/>
        <UserDataTable data={data}/>
    </div>
  )
}

export default UserPageX