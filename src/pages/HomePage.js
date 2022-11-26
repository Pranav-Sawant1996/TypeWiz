import { GlobalStyles } from "../styles/Global";
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import TypingBox from '../components/TypingBox'
import {useTheme} from '../context/Theme'
import { auth } from "../FirebaseConfig";

const HomePage = () => {
    const {theme}= useTheme()
    // console.log(auth)
  return (

    
    <div className="canvas">
      {/* <GlobalStyles /> */}
      <Header />
      <TypingBox />
      <Footer />
    </div>
  
  )
}

export default HomePage