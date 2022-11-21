import { TextField,Button, Box } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const LoginForm = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=()=>{
    if(!email || !password){
      alert('Enter all details')
      return
    }
    console.log(email,password)
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
        <Button
        variant='contained'
        size='large'
        style={{backgroundColor:'red'}}
        onClick={handleSubmit}
        >
        Login
        </Button>
        </Box>
    </div>
  )
}

export default LoginForm