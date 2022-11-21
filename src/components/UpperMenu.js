import React from 'react'
import { useTestMode } from '../context/TestMode'

const UpperMenu = ({timer}) => {

  const {setTestTime}= useTestMode();
  const updateTime= (e)=>{
    setTestTime(e.target.id)
  }
  return (
    <div className='menu'>
        <div className='countdown'>
        Time: {timer} s
        </div>

        <div className='time-modes'>
          <span>Select Time Frame</span>
        <div className='time' id='15' onClick={(e)=>updateTime(e)}>15s</div>
        <div className='time' id='30' onClick={(e)=>updateTime(e)}>30s</div>
        <div className='time' id='60' onClick={(e)=>updateTime(e)}>60s</div>
        </div>
    </div>
  )
}

export default UpperMenu