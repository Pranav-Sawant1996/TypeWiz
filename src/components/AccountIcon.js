import React from 'react'
import { useState } from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Modal,Tabs, Tab} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@material-ui/core'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';



const useStyles = makeStyles(()=>({  //styling from material ui
    modal: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        width:400
    }
}))

const AccountIcon = () => {
    const [open,setOpen]=useState(false)
    const [value,setValue]=useState(0)
    

    const handleValueChange=(e,v)=>{
        setValue(v)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    const classes=useStyles()
    // console.log(value)
  return (
    <div>
        <AccountCircleSharpIcon onClick={()=>setOpen(true)} />

        <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal} 
        >
            <div className={classes.box} >
            <AppBar 
            position='static'
            style={{backgroundColor:'transparent'}}
            >
            <Tabs
             value={value}
             onChange={handleValueChange}
             variant='fullWidth'
             >
                <Tab label='login' style={{color:'white'}}></Tab>
                <Tab label='SignUp' style={{color:'white'}}></Tab>
            </Tabs>
            </AppBar>
            {value===0 && <LoginForm/>}
            {value===1 && <SignupForm/>}
            </div>
            
        </Modal>
    </div>
  )
}

export default AccountIcon