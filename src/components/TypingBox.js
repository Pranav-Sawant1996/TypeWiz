import React, {createRef, useEffect, useRef, useState, useMemo} from 'react'
import { useTestMode } from '../context/TestMode'
import UpperMenu from './UpperMenu'
import Stats from './Stats'
import { Dialog, DialogTitle } from '@material-ui/core'
var randomWords= require('random-words')


const TypingBox = ({}) => {
  const {testTime,testMode, testWords}=useTestMode()
  const [currentWordIndex,setCurrentWordIndex]=useState(0)
  const [currentCharIndex,setCurrentCharIndex]=useState(0)
  const inputTextRef=useRef(null)
  const [countDown,setCountDown]=useState(()=>{
    if(testMode==='words'){
      return 180
    }
    else{
      return testTime
    }
  })
  const [testStart,setTestStart]=useState(false)
  const [testOver,setTestOver]=useState(false)
 
  const [timeId,setTimeId]= useState(null)
  const [correctChars,setCorrectChars]=useState(0)
  const [incorrectChars,setIncorrectChars]=useState(0)
  const [extraChars,setExtraChars]=useState(0)
  const [missedChars,setMissedChars]=useState(0)
  const [correctWords,setCorrectWords]=useState(0)
  const [graphData,setGraphData]=useState([])
  const [openDialog,setOpenDialog]=useState(false)


  const [wordsArray, setWordsArray]=useState(()=>{
    return randomWords(100)
  })

  const words=useMemo(()=>{
    return wordsArray
  },[wordsArray])

  const wordSpanRef=useMemo(()=>{
    return Array(words.length).fill(0).map(i=>createRef(null))
  },[words])

  const resetWordSpanRefClassNames= ()=>{
    wordSpanRef.map(i=>{
      Array.from(i.current.childNodes).map(j=>{   //Array.form to convert clidanodes to array to use map function
        j.className='char'
      })
    })
    wordSpanRef[0].current.childNodes[0].className='char current'
  }

  // const wordSpanRef=Array(words.length).fill(0).map(i=>createRef(null))
  // console.log(wordSpanRef)
  // console.log(inputTextRef)

 const handleDialogEvents =(e)=>{
  //dialog box logic
  //logic for space
  if(e.keyCode===32){
e.preventDefault()
redoTest()
setOpenDialog(false)
return
  }

  //logic for tab/enter
  if(e.keyCode===9 || e.keyCode===13){
    console.log('enter')
    e.preventDefault()
reset()
setOpenDialog(false)
return
  }

  e.preventDefault()
  setOpenDialog(false)
  focusInput()
  startTime()
 }

 const redoTest= ()=>{
  setCurrentCharIndex(0)
  setCurrentWordIndex(0)
  setTestStart(false)
  setTestOver(false)
  clearInterval(timeId)
  // setTestStart(true)
  setCountDown(testTime)
  if(testMode==='words'){
 setCountDown(180)
  }
  setGraphData([])
   setCorrectChars(0)
   setIncorrectChars(0)
   setMissedChars(0)
   setMissedChars(0)
   setExtraChars(0)
   setCorrectWords(0)
 resetWordSpanRefClassNames()
 focusInput()
 }


  const handleKeyDown= (e)=>{
    //logic for tab
    if(e.keyCode===9){
      if(testStart){
        clearInterval(timeId)
      }
      e.preventDefault()
      setOpenDialog(true)
      handleDialogEvents()
      return
    }

    if(!testStart){
      startTime()
      setTestStart(true)
    }
    let allChildrenSpans=wordSpanRef[currentWordIndex].current.childNodes;
    
    // console.log(allChildrenSpans )
    // console.log(e.key) 

    // space logic
    // console.log('key',e)
    if(e.keyCode===32){
      if(currentWordIndex===wordsArray.length-1){
        clearInterval(timeId)
        setTestOver(true)
        return
      }

      const correctChars=wordSpanRef[currentWordIndex].current.querySelectorAll('.correct')
      const incorrectChars=wordSpanRef[currentWordIndex].current.querySelectorAll('.incorrect')
      setMissedChars(missedChars+(allChildrenSpans.length-(correctChars.length+incorrectChars.length)))
      if(correctChars.length===allChildrenSpans.length){
        setCorrectWords(correctWords+1)
      }
      //removing cursor from word
      if(allChildrenSpans.length<=currentCharIndex){
        allChildrenSpans[currentCharIndex-1].classList.remove('right')
        // allChildrenSpans[currentCharIndex-1].className=allChildrenSpans[currentCharIndex-1].className.replace('right','')
      }
      else{
        allChildrenSpans[currentCharIndex].className=allChildrenSpans[currentCharIndex].className.replace('current','')
      }
      

    //add cursor to next word

    wordSpanRef[currentWordIndex+1].current.childNodes[0].className='char current'

      setCurrentWordIndex(currentWordIndex+1)
      setCurrentCharIndex(0)

      return
    }

//backspace logic
    if(e.keyCode===8){

      if(currentCharIndex!==0){

        if(currentCharIndex===allChildrenSpans.length){

          if(allChildrenSpans[currentCharIndex-1].className.includes('extra')){
            allChildrenSpans[currentCharIndex-1].remove()
            allChildrenSpans[currentCharIndex-2].className+=' right'
          }
          else{

            allChildrenSpans[currentCharIndex-1].className='char current'
          }
          setCurrentCharIndex(currentCharIndex-1)
          return;
        }

        allChildrenSpans[currentCharIndex].className='char'
        allChildrenSpans[currentCharIndex-1].className='char current'
        setCurrentCharIndex(currentCharIndex-1)
      }

      return;
    }

    //for extra characters
    if(currentCharIndex===allChildrenSpans.length){
      let newSpan=document.createElement('span')
      newSpan.innerText=e.key
      newSpan.className='char incorrect right extra'
      allChildrenSpans[currentCharIndex-1].className=allChildrenSpans[currentCharIndex-1].className.replace('right','')

      wordSpanRef[currentWordIndex].current.append(newSpan)
      setCurrentCharIndex(currentCharIndex+1)
      setExtraChars(extraChars+1)
      return
    }


    //incorrect and correct character
    if(e.key===allChildrenSpans[currentCharIndex].innerText){
      // console.log('yes')
      allChildrenSpans[currentCharIndex].className='char correct'
      setCorrectChars(correctChars+1)
    }
    else{
      // console.log('no')
      allChildrenSpans[currentCharIndex].className='char incorrect'
      setIncorrectChars(incorrectChars+1)
    }

    if(currentCharIndex+1===allChildrenSpans.length){
      allChildrenSpans[currentCharIndex].className+=' right'
    }
    else{
      allChildrenSpans[currentCharIndex+1].className='char current'
    }
    setCurrentCharIndex(currentCharIndex+1);
    
  }

  const WPM= ()=>{
    return Math.round((correctChars/5)/(((graphData[graphData.length-1][0])+1)/60))
  }

  const accuracy= ()=>{
    return Math.round((correctWords/currentWordIndex)*100)
  }

  const reset = ()=>{
    setCurrentCharIndex(0)
    setCurrentWordIndex(0)
    setTestStart(false)
    setTestOver(false)
    clearInterval(timeId)
    // setTestStart(true)
    setCountDown(testTime)
    if(testMode==='words'){
      let random=randomWords(testWords)
   setWordsArray(random)
   setCountDown(180)
    }
    else{
      let random=randomWords(100)
      setWordsArray(random)

    }
   setGraphData([])
   setCorrectChars(0)
   setIncorrectChars(0)
   setMissedChars(0)
   setMissedChars(0)
   setExtraChars(0)
   setCorrectWords(0)
   resetWordSpanRefClassNames()
   focusInput()
  }

  const focusInput= ()=>{
    console.log('hii')
    inputTextRef.current.focus()
    wordSpanRef[0].current.childNodes[0].className='char current'
    // console.log(wordSpanRef[1].current)
  }

  useEffect(()=>{
    reset()
  },[testTime,testMode,testWords])

  useEffect(()=>{
     focusInput()
    //  wordSpanRef[0].current.childNodes[0].className='char current'
  },[])

  //timer
  const startTime = ()=>{
    const timeId= setInterval(timer,1000)
    setTimeId(timeId)
     function timer(){
      setCountDown((prevCountDown)=>{

        setCorrectChars((correctChars)=>{
          setGraphData((data)=>{
            const startTime= (testMode==='words')?(180):testTime
            return [...data,[startTime-prevCountDown,Math.round((correctChars/5)/((startTime-prevCountDown+1)/60))]]
          })
          return correctChars
        })

        if(prevCountDown===1){
          clearInterval(timeId)
          setCountDown(0)
          setTestOver(true)  
        }
        else{

          return prevCountDown-1
        }
      })
     }
  }


  return (
    <div>
      {/* <UpperMenu timer={countDown} /> */}
      {testOver?(<Stats wpm={WPM()} accuracy={accuracy()} graphData={graphData} correctChars={correctChars} incorrectChars={incorrectChars} missedChars={missedChars} extraChars={extraChars} />):(
        
        <div className='type-box' onClick={focusInput}>
      <UpperMenu timer={countDown} currentWordIndex={currentWordIndex} />
    <div className='words'>
      
      {words.map((word,index)=>(
        <span  className='word' ref={wordSpanRef[index]} key={index}>
            {word.split('').map((char,idx)=>(
              <span className='char' key={idx}>
                  {char}
                </span>
            ))}
        </span>
      ))}
    </div>
    </div>
      )}
    <input type='text' 
    className='hidden-text' 
    ref={inputTextRef} 
    onKeyDown={(e)=>(handleKeyDown(e))}
    /> 

    <Dialog
    open={openDialog}
    onKeyDown={handleDialogEvents}
    >
      <DialogTitle>
        <div className='instruction'> Press space to redo</div>
        <div className='instruction'> Press Tab/Enter to restart</div>
        <div className='instruction'>Press any other key to exit</div>
      </DialogTitle>
    </Dialog>


    </div>
  )
}

export default TypingBox