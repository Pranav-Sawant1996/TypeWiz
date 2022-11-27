import React from 'react'
import AccountIcon from './AccountIcon'
import logo from '../logo/logo.JPG'


const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
        <img src='../logo/logo.JPG'/>
        </div>
        <div className='icon'>
        <AccountIcon /> 
        </div>

    </div>
  )
}

export default Header