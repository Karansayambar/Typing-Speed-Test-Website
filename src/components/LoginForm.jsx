import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const LoginForm = ({handleModalClose}) => {
    const theme = useTheme();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = () => {
        if(!email || !password ){
            toast.warning('All Fields Are Required 🥸', {
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

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            toast.success('Login Successfully 👌', {
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
            handleModalClose();
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
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
                style : {color : theme.boxTypeText}
            }}
        />
        <Button style={{background : theme.textColor, color : "black"}} onClick={handleSubmit}>Login</Button>
    </Box>
  )
}

export default LoginForm