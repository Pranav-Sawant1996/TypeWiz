import { red } from "@mui/material/colors"

const darkTheme={
    label:'Dark',
    background:'black',
    title:'pink',
    typeBoxText:'grey',
    
}


 const paperTheme={
    label:'Paper',
    background:'#eeeeee',
    title:'#444444',
    typeBoxText:'#b2b2b2',
   
 }

 const brownTheme={
    label:'Brown',
    background:'#a86948',
    title:'#ffe4bc',
    typeBoxText:'#81482b',

 }

export const themeOptions=[
    {
        value: darkTheme, label:'Dark'
    },
    {
        value: paperTheme, label:'Paper'
    },
    {
        value: brownTheme, label:'Brown'
    }
]