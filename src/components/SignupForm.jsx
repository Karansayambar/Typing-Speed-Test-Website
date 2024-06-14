import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../Context/ThemeContext';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const SignupForm = () => {
    const {theme} = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = ({handleModalClose}) => {
        if(!email || !password || !confirmPassword){
            toast.warning('All Fields Are Required 🥸', {
                position: "top-",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: "bounce",
            });
            return;
        }
        if(password < 8 ){
            toast.warning('Password Must More than 6 Charecters 🥸', {
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
            return;
        }
        if(password !== confirmPassword){
            toast.warning('Password should be Match 🥸', {
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
            return;
        }

        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            toast.success('User Created Successfully 👌', {
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
            handleModalClose();
        }).catch((error) =>{
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
  return (
    <Box p={3} style={{display : "flex", flexDirection : "column", background : theme.background, gap : "1rem"}}>
        <TextField 
            variant='outlined'
            type='email'
            label="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
                style : {color : theme.boxTypeText}
            }}
        />
        <TextField 
            variant='outlined'
            type='password'
            label="Enter Password"
            onChange = {(e) => setPassword(e.target.value)}
            InputLabelProps={{
                style : {color : theme.boxTypeText}
            }}
        />
        <TextField 
            variant='outlined'
            type='password'
            label="Enter Password"
            onChange = {(e) => setConfirmPassword(e.target.value)}
        />
        <Button style={{background : theme.textColor, color : "black"}} onClick={handleSubmit}>Signup</Button>
        {/* <Button/> */}
    </Box>
  )
}

export default SignupForm