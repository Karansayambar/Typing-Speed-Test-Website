import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../Context/ThemeContext';
// import GoogleSvg from '../GoogleSvg';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {
    const {theme} = useTheme();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleModalOpen = () => {
        if(user){
          navigate("/user")
        }else{
          setOpen(true);
        }
    }
    const handleModalClose = () => {
        setOpen(false);
    }
    const handleValueChange = (e, v) => {
        setValue(v);
    }

    const logout = () => {
      auth.signOut().then((res) => {
        toast.success('Logout Successfully 👌', {
                position: "top",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "bounce",
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
                transition: "bounce",
          });
      })
    }

    // const googleProvider = new GoogleAuthProvider();

    // const handGoogleSign = () => {
    //   signInWithPopup(auth, googleProvider).then((res) => {
    //     toast.success('Login Successfully 👌', {
    //             position: "top",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: "bounce",
    //       });
    //   }).catch((error) => {
    //     toast.error(error.message, {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: "Bounce",
    //       }); 
      // })
    // }

  return (
    <div>
        <AccountCircleIcon onClick = {handleModalOpen} sx={{ width: 50, height: 50, cursor: 'pointer' , margin :"0rem 1rem"}} />
        {user && <LogoutIcon sx={{ width: 40, height: 40, cursor: 'pointer'}} onClick={logout}/>}
        <Modal 
        open={open}
        onClose={handleModalClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ width: '400px',opacity : "1", padding: '20px', borderRadius: '8px', textAlign : "center", border : "1px solid white"}}>
          <AppBar position='static' style={{background : theme.textColor}}>
            <Tabs
            value={value}
            onChange={handleValueChange}
            variant='fullWidth'
            >
                <Tab label="Login"></Tab>
                <Tab label="Signup"></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleModalClose={handleModalClose}/>}
          {value === 1 && <SignupForm handleModalClose={handleModalClose}/>}
          {/* <Box style={{display : "flex", flexDirection : "column", gap : "1rem"}}>
            <spna>OR</spna>
            <button className='btn' onClick={handGoogleSign}>{value === 0 ? "Login" : "Signup"} with <GoogleSvg/></button>
          </Box> */}
        </div>
      </Modal>
    </div>
  )
}

export default AccountCircle;