import React from 'react'
import { useTestMode } from '../context/TestMode'

const UpperMenu = ({timer,currentWordIndex}) => {

  const {setTestTime, testMode,setTestWords,setTestMode,testWords}= useTestMode();
  const updateTime= (e)=>{
    setTestTime(e.target.id)
  }

  const updateWords = (e)=>{
    setTestWords(Number(e.target.id))
  }

  const setMode = (e)=>{
    setTestMode(e.target.id)
  }
  return (
    <div className='menu'>
        <div className='countdown'> 
        {testMode==='time'?timer:`${currentWordIndex}/${testWords}`}
        
        </div>
        <div className='modes'>
        <span className='mode' id='time' onClick={(e)=>setMode(e)} style={{paddingRight:'10px'}}>Time</span>
        <span className='mode' id='words' onClick={(e)=>setMode(e)} >Words</span>
        </div>

        {testMode==='time'?(<div className='time-modes'>
       
       <div className='time' id='15' onClick={(e)=>updateTime(e)}>15s</div>
       <div className='time' id='30' onClick={(e)=>updateTime(e)}>30s</div>
       <div className='time' id='60' onClick={(e)=>updateTime(e)}>60s</div>
       </div>):(
        <div className='word-mode'>
            <div className='word' id='10' onClick={(e)=>updateWords(e)} >10 </div>
            <div className='word'id='20' onClick={(e)=>updateWords(e)} >20 </div>
            <div className='word' id='30' onClick={(e)=>updateWords(e)}>30 </div>
          </div>
       )}

        
    </div>
  )
}

export default UpperMenu