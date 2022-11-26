import { red } from "@mui/material/colors"

const darkTheme={
    label:'Dark',
    background:'black',
    title:'pink',
    typeBoxText:'grey',
    stats:'green'
}

const redTheme={
    label:'Red',
    background:'red',
    title:'white',
    typeBoxText:'blue',
    stats:'purple'
}

export const themeOptions=[
    {
        value: darkTheme, label:'Dark'
    },
    {
        value: redTheme, label:'Red'
    }
]