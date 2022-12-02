import { createGlobalStyle } from "styled-components";


export const GlobalStyles= createGlobalStyle`

*,
*::after,
*::before{ 
    box-sizing : border-box;
}

body{
    background:${({theme})=>theme.background};
    color:${({theme})=>theme.title};
    padding:0;
    margin:0;
    transition: all 0.25s linear;
    overflow-y: scroll;
}

body::-webkit-scrollbar{
    display:none;
}

.canvas{
    display:grid;
    grid-auto-flow:row;
    grid-template-row:auto 1fr auto;
    min-height:100vh;
    gap:0.5rem;
    padding:1rem;
    width:100vw;
    align-items:center;
}

.type-box{
    display:block;
    max-width:1000px;  
    height:188px;
    margin-left:auto;
    margin-right:auto;
    overflow:hidden;
}

.words{
    font-size:20px;
    display:flex;
    flex-wrap:wrap;
    align-content:center;
    width:100%;
    color:${({theme})=>theme.typeBoxText}
}

.word{
    margin:4px;
    
}

.hidden-text{
    opacity:0;
}

.correct{
    color:${({theme})=>theme.title};
}
.incorrect{
    color:red;
}

.current{
    border-left:1px solid;
    animation:blinking 2s infinite;
    animation-timing-function:ease;

    @keyframes blinking{
        0%{border-left-color:${({theme})=>theme.title}}
        25%{border-left-color:${({theme})=>theme.background}}
        50%{border-left-color:${({theme})=>theme.title}}
        100%{border-left-color:${({theme})=>theme.background}}
    }
}

.right{
    border-right:1px solid;
    animation:blinkingRight 2s infinite;
    animation-timing-function:ease;

    @keyframes blinkingRight{
        0%{border-right-color:${({theme})=>theme.title}}
        25%{border-right-color:${({theme})=>theme.background}}
        50%{border-right-color:${({theme})=>theme.title}}
        100%{border-right-color:${({theme})=>theme.background}}
    }
}

.menu{
    display:flex;
    max-width:1000px;  
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    font-size:15px;
    padding:1rem;
    color:${({theme})=>theme.typeBoxText}
}

.time-modes, .word-mode {
    display:flex;
   
}

.time, .word{
    margin-right:10px;
}
.time:hover{
    color:${({theme})=>theme.title};
    cursor:pointer;
}
.word:hover{
    color:${({theme})=>theme.title};
    cursor:pointer;
}
.mode:hover{
    color:${({theme})=>theme.title};
    cursor:pointer;
}

.stats-box{
display:flex;
max-width:1000px;
margin-left:auto;
margin-right:auto;
}

.title{
    font-size:15px;
    color:${({theme})=>theme.typeBoxText};
}

.subtitle{
    font-size:20px;
    color:${({theme})=>theme.title};
}

.left-stats{
    width:30%;
    padding:20px;
}

.right-stats{
    width:70%;
}
.header{
    display:flex;
   width:1000px;
    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    align-items:center;
    height:70px;
}
.footer{
    display:flex;
    flex-direction:column; 
   width:1000px;
    margin-left:auto;
    margin-right:auto;
    align-items:center;
    height:70px;
}
.actual-footer{
    display:flex;
    justify-content:space-between;
    width:1000px;
}
.result-graph{
    width:1000px;
    margin:auto;
}
.table{
    width:1000px;
    margin:auto;
  
}

.user-profile{
    width:1000px;
    margin:auto;
    display:flex;
    border: 1px solid pink;
    border-radius: 20px;
    padding:10px; 
}

.user{
    display:flex;
    width:50%;
    justif-content:center;
    margin-top:10px;
    margin-bottom:10px;
    padding:10px;
    border-right: 1px solid;
}

.picture{
    width:50%;
   

}

.info{
    width:50%;
    margin-top:1rem;
    font-size:1rem;
    text-align:center;
    padding:1rem;
}

.total-times{
    width:50%;
    display:flex;
    justify-content:center;
    align-items:center;
}
.loading{
    display:flex;
    min-height:100vh;
    justify-content:center;
    align-items:center;
    text-align:center;
}

.instruction{
    color:${({theme})=>theme.title};
}

.hint{
    kbd{
        background-color:${({theme})=>theme.title};
        color:${({theme})=>theme.background};
        padding:3px;
        border-radius:4px;
    }
}

.reset-btn  {
    transform:scale(1.5);
    margin:auto;
    margin-top:20px;
}

`;