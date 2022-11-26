import { TextField,Button, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useAlert } from '../context/AlertMessage'
import { useTheme } from '../context/Theme'
import { auth } from '../FirebaseConfig'
import errorMapping from '../utils/errorMessages'

const LoginForm = ({handleClose}) => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setAlert}=useAlert()
  const {theme}=useTheme()
  const handleSubmit=()=>{
    if(!email || !password){
      // alert('Enter all details')
       setAlert({
        open:true,
        type:'warning',
        message: 'Enter all details'
      })   
      return
    }
    // console.log(email,password)
    auth.signInWithEmailAndPassword(email,password).then((e)=>{
      // alert('logged in')
      setAlert({
        open:true,
        type:'success',
        message: 'login successfull'
      })

      handleClose()
    }).catch((err)=>{
      // alert(errorMapping[err.code])
      // console.log(err)
      setAlert({
        open:true,
        type:'error',
        message: errorMapping[err.code]  || 'some error occured'
      })
    })
  }

  return (
    <div>
        <Box
        p={3}
        style={{
            display:'flex',
            flexDirection:'column',
            gap:'15px',
            padding:'10px',
            backgroundColor:'transparent',
           
        }}
        >
        <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        InputLabelProps={{
          style:{
            color:theme.title
          }
        }}
        InputProps={{
          style:{
            color:theme.title
          }
        }}
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
         variant='outlined'
         type='password'
         label='Enter Password'
         InputLabelProps={{
          style:{
            color:theme.title
          }
        }}
        InputProps={{
          style:{
            color:theme.title
          }
        }}
         onChange={(e)=>setPassword(e.target.value)}
        >
            
        </TextField>
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.title, color:theme.backgroundColor}}
        onClick={handleSubmit}
        >
        Login
        </Button>
        </Box>
    </div>
  )
}

export default LoginForm