import React from 'react'
import { useState } from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Modal,Tabs, Tab} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@material-ui/core'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, db } from '../FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAlert } from '../context/AlertMessage';
import { useTheme } from '../context/Theme';


const useStyles = makeStyles(()=>({  //styling from material ui
    modal: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backdropFilter:'blur(3px)'
        
    },
    box:{
        width:400,
        textAlign:'center',
        border: '1px solid'
    }
}))


const AccountIcon = () => {
    const [open,setOpen]=useState(false)
    const [value,setValue]=useState(0)
    const {theme}=useTheme()
    const {setAlert}=useAlert()

    const handleValueChange=(e,v)=>{
        setValue(v)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const logout= ()=>{
        auth.signOut().then((e)=>{     //auth.signOut firebse inbulid function to logout 
           setAlert({
            open:true,
            type:'success',
            message:'Logged out!'
           })
        }).catch((err)=>{
            // const error=err.message
            // console.log(error)
            // alert('error')
            setAlert({
                open:true,
                type:'error',
                message:'Try again'
               })
        })
    }
    const navigate= useNavigate()   // useNavigate  to route between pages using if else refer handleIconClick function
    const classes=useStyles()
    // console.log(value)

    // auth.currentUser      //if auth.curretUser is not null or indefined then the someone has logged in this is done using => "react-firebase-hooks" to be installed

    const [user]=useAuthState(auth)    //same as auth,currentUser

    const handleIconClick = ()=>{
        if(user){
            navigate('/user')
        }
        else{
            setOpen(true)
        }
    }

    
    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle=()=>{
        signInWithPopup(auth, googleProvider).then(async(res)=>{
            const username=res.user.displayName
            // console.log(username)
            const ref = await db.collection('username').doc(username).set({
                uid: res.user.uid
            }).then((response)=>{ 
                setAlert({
                    open:true,
                    type:'success',
                    message:'Logged in'
                })
                handleClose()
            })
        }).catch((err)=>{
            console.log(err)
            setAlert({
                open:true,
                type:'error',
                message:'Error! Please login using email id'
            })
        })
    }

    // console.log(user)
  return (
    <div>
        <AccountCircleSharpIcon onClick={handleIconClick} />
        {(user) && <LogoutIcon onClick={logout} />}

        <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal} 
        >
            <div className={classes.box} >
            <AppBar 
            position='static'
            style={{backgroundColor:'transparent', borderColor:theme.title}}
            >
            <Tabs
             value={value}
             onChange={handleValueChange}
             variant='fullWidth'
             >
                <Tab label='login' style={{color:theme.title}}></Tab>
                <Tab label='SignUp' style={{color:theme.title}}></Tab>
            </Tabs>
            </AppBar>
            {value===0 && <LoginForm handleClose={handleClose} />}
            {value===1 && <SignupForm handleClose={handleClose} />}

            <Box >
            <span style={{display:'block', padding:'4px'}} >OR</span>
            <GoogleButton style={{width:'100%'}}
            onClick={signInWithGoogle}
            />
            </Box>

            </div>
            
        </Modal>
    </div>
  )
}

export default AccountIcon