import { createContext, useContext } from "react";
import { useState } from "react";
import { themeOptions } from "../styles/Theme";





const themeContext=createContext()

export const ThemeContextProvider= ({children})=>{
    const defaultTheme=JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value     //localStorage.getItem('key') => to get data form the local storage.  JSON.parse => to convert string to JSON. default will be localStorage theme if it has any value stored or it will give the 0th element of array
    const [theme,setTheme]=useState(defaultTheme)

const values={
theme,
setTheme,
defaultTheme
}

    return (<themeContext.Provider value={values}>{children} </themeContext.Provider>)
}

export const useTheme=()=> useContext(themeContext)