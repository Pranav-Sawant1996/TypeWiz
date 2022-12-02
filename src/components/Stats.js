import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAlert } from '../context/AlertMessage'
import { auth, db } from '../FirebaseConfig'
import Graph from './Graph'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const Stats = ({wpm,accuracy,graphData,correctChars,incorrectChars,missedChars,extraChars,reset}) => {
  const [user]=useAuthState(auth)
  const {setAlert}=useAlert()
  var timeSet=new Set()
  const newGraph=graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0])
      return i
    }
  })
  

  const pushResultToDB= async()=>{
const resultRef=db.collection('Results')
const {uid}=auth.currentUser
if(!isNaN(accuracy)){
  // push results to db
 await resultRef.add({
    userId:uid,
    wpm:wpm,
    accuracy:accuracy,
    characters:`${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
    timeStamp: new Date()
  }).then((res)=>{
    setAlert({
      open:true,
      type:'success',
      message:'Results saved'
    })
  })
}
else{
  setAlert({
    open:true,
    type:'error',
    message:'Invalid test'
  })
}

  }

  useEffect(()=>{
    if(user){
      pushResultToDB()
    }
    else{
       setAlert({
        open:true,
        type:'warning',
        message:'login to save results!'
       })
    }
  },[])
  return (
    <div className='stats-box'>
        <div className='left-stats'>
          <div className='stats'>

        <div className='title'>WPM</div>
        <div className='subtitle'>{wpm}</div>
        <div className='title'>Accuracy</div>
        <div className='subtitle'>{accuracy}%</div>
        <div className='title'>Characters</div> 
        <div className='subtitle'>{correctChars}/{incorrectChars}/{missedChars}/{extraChars} </div>
          </div>
          <RotateLeftIcon onClick={reset} className='reset-btn' />
        </div>
        <div className='right-stats'>
        <Graph graphData={newGraph}/>


        </div>
    </div>
  )
}

export default Stats