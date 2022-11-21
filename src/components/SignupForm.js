import React from 'react'
import { TextField,Button, Box } from '@mui/material'
import { useState } from 'react'
import { auth } from '../FirebaseConfig'

const SignupForm = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')

const handleSubmit= ()=>{
if(!email || !password || !confirmPassword){
    alert('Enter all details')
    return
}
if(password!==confirmPassword){
    alert("password and confirm password doesnt match")
    return
}

auth.createUserWithEmailAndPassword(email,password).then((ok)=>{
    alert('user created')
}).catch((err)=>{
    alert('error')
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
            backgroundColor:'white'
        }}
        >
        <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
         variant='outlined'
         type='password'
         label='Enter Password'
         onChange={(e)=>setPassword(e.target.value)}
        >
            
        </TextField>

        <TextField
         variant='outlined'
         type='password'
         label='Confirm Password'
         onChange={(e)=>setConfirmPassword(e.target.value)}
        >
            
        </TextField>
        
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:'red'}}
        onClick={handleSubmit}
        >
        Sign Up
        </Button>
        </Box>
    </div>
  )
}

export default SignupForm