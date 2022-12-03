import React from 'react'
import AccountIcon from './AccountIcon'
import logo from '../logo/logo.JPG'
import CompareButton from './CompareButton'


const Header = () => {
  return (
    <div className='header'>
        <div className='logo' style={{display:'flex', alignItems:'center'}}>
        <span style={{display:'block', marginRight:'20px'}}><b>TypeWiz</b></span>
        <CompareButton />
        </div>
        <div className='icon'>
        <AccountIcon /> 
        </div>

    </div>
  )
}

export default Header