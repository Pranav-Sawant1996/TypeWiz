import React from 'react'
import { TextField,Button, Box } from '@mui/material'
import { useState } from 'react'
import { auth } from '../FirebaseConfig'
import errorMapping from '../utils/errorMessages'
import { useAlert } from '../context/AlertMessage'
import { useTheme } from '../context/Theme'

const SignupForm = ({handleClose}) => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')
const {setAlert}=useAlert()
const {theme}=useTheme()

const handleSubmit= ()=>{
if(!email || !password || !confirmPassword){
    // alert('Enter all details')
    setAlert({
        open:true,
        type:'warning',
        message: 'Enter all details'
      })
    return
}
if(password!==confirmPassword){
    // alert("password and confirm password doesnt match")
    setAlert({
        open:true,
        type:'warning',
        message: 'password and confirm password doesnt match'
      })

    return
}

auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
    // alert('user created')
    setAlert({
        open:true,
        type:'success',
        message: 'Signup successfull'
      })

    handleClose()
}).catch((err)=>{
    // console.log(err)
    // console.log('error code',err.code)
    // console.log('error message',err.message)
    // alert(errorMapping[err.code])
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

        <TextField
         variant='outlined'
         type='password'
         label='Confirm Password'
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
         onChange={(e)=>setConfirmPassword(e.target.value)}
        >
            
        </TextField>
        
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:theme.title, color:theme.backgroundColor}}
        onClick={handleSubmit}
        >
        Sign Up
        </Button>
        </Box>
    </div>
  )
}

export default SignupForm