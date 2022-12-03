import { Button, makeStyles, Modal, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../context/AlertMessage'
import { useTheme } from '../context/Theme'
import { db } from '../FirebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../FirebaseConfig'


const useStyles=makeStyles(()=>({
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backdropFilter:'blur(2px)'
    },
    compareBox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:'auto',
        padding:'1rem',
        border:'1px solid'
    }
}))

const CompareButton = () => {
    const [open,setOpen]=useState(false)
    const [username,setUsername]=useState('')
    const classes=useStyles()
    const {theme}=useTheme()
    const {setAlert}=useAlert()
    const navigate=useNavigate()
    const [user]=useAuthState(auth)

    const handleModal =()=>{
      if(user){
        setOpen(true)
      }
      else{
        setAlert({
          open:true,
          type:'warning',
          message:'Please Login to compare'
      })
      }
    }

    const handleClose =()=>{
        setOpen(false)
    }


    const checkUsernameAvaliability = async()=>{
        const ref= db.collection('username').doc(`${username}`)
        const response= await ref.get()    
        console.log(response.data().username)
        if(user.uid=== response.data().uid){
          return false
        }
        return response.exists     
      }

    const handleSubmit =async ()=>{
        if(await checkUsernameAvaliability()){
            navigate(`/compare/${username}`)
        }
        else{
            setAlert({
                open:true,
                type:'warning',
                message:'invalid username'
            })}
        }
        

  return (
    <div>

    <div className='compare-btn' style={{cursor:'pointer', backgroundColor:theme.title, color:theme.background, padding:'4px',borderRadius:'4px'}} onClick={handleModal}>
        Compare
    </div>
   <Modal 
   open={open}
   onClose={handleClose}
   className={classes.modal}
   >
    <div className={classes.compareBox}>
    <TextField onChange={(e)=>setUsername(e.target.value)}
    type='text'
    label='Enter username'
    variant='outlined'
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
    />
    <Button style={{backgroundColor:theme.title, color:theme.background, marginLeft:'6px'}} onClick={handleSubmit} >Compare</Button>
    </div>
   
   </Modal>
    </div>
  )
}

export default CompareButton