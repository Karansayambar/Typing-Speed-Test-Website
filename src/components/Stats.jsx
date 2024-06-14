import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const Stats = ({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData }) => {
  const timeSet = new Set();
  const newGraph = graphData.filter(i => {
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })
  
  const pushDataToDB = () => {
    // if(!isNaN(accuracy)){
    //   toast.warning('Invalid Test 🫡', {
    //             position: "top",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: "Bounce",
    //         });
    //         return;
    // }

    const resultRef = db.collection('Results');
    const {uid} = auth.currentUser;
    resultRef.add({
      wpm : wpm,
      accuracy : accuracy,
      timeSpan : new Date(),
      characters : `${correctChars} / ${incorrectChars} / ${missedChars} / ${extraChars}`,
      userId : uid
    }).then((res) => {
      toast.success('File Created Successfully 👌', {
                position: "top",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce",
            });
    }).catch((error) => {
      toast.error(error.message, {
                position: "top",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce",
            });
    })
  }

  useEffect(() => {
    if(auth.currentUser){
      pushDataToDB();
    }else{
      toast.warning('Login for save details 🥸', {
                position: "top",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "Bounce",
            });
    }
  },[])

  return (
    <div className='stats-box'>
        <div className='left-stats'>
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Charecters</div>
            <div className="subtitle">{`${correctChars} / ${incorrectChars} / ${missedChars} / ${extraChars}`}</div>
        </div>
        <div className='right-stats'>
          <Graph graphData = {newGraph}/>
        </div>
    </div>
  )
}

export default Stats