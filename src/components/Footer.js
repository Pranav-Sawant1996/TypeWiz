import React from 'react'
import Select from 'react-select'
import { themeOptions } from '../styles/Theme'
import { useTheme } from '../context/Theme'

const Footer = () => {
  const {setTheme, theme,  defaultTheme}=useTheme()

  const handleThemeChange=(e)=>{
    // console.log(e.value)
    setTheme(e.value)
    localStorage.setItem('theme',JSON.stringify(e.value))            //local storage to keep the same theme after refreshing the website localStorage.setItem('key',value) valur=>JSON.stringify  to convert object provided by browser into string
  }
  return (
    <div className='footer'>
    <div className='footer-links'>
links
    </div>
    <div className='theme'>
    <Select
    options={themeOptions}
    menuPlacement='top'
    onChange={handleThemeChange}
    defaultValue={{value:defaultTheme, label:defaultTheme.label}}
    styles={{
      control: (styles)=>({...styles, backgroundColor: theme.backgroundColor }),
      menu: (styles)=>({...styles, color:theme.typeBoxText }) 
    }}
    />
    </div>
    </div>
  )
}

export default Footer