import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Graph from '../components/Graph'
import { auth, db } from '../FirebaseConfig'

const ComparePage = () => {

    const {username}=useParams()
    const [loggenInUserData,setLoggedInUserData]=useState([])
    const [compareUserData,setCompareUserData]=useState([])
    const [loggenInUserGraphData,setLoggedInUserGraphData]=useState([])
    const [compareUserGraphData,setCompareUserGraphData]=useState([])

    const getUID=  async()=>{
        const ref= db.collection('username').doc(`${username}`)
        const response= await ref.get()  
        return response.data().uid 

    }

    const getData= async ()=>{
        const userUID=await getUID()
        const {uid} =auth.currentUser
        const resultRef = db.collection("Results");

        let tempData = [];
        let tempGraphData =[]

        resultRef
          .where("userId", "==", uid).orderBy('timeStamp','desc')
          .get()
          .then((snapshot) => {
            // console.log(snapshot)
            snapshot.docs.forEach((doc) => {
              tempData.push({ ...doc.data() });
              tempGraphData.push([doc.data().timeStamp, doc.data().wpm])
              // console.log(tempData)
              setLoggedInUserData(tempData)
              setLoggedInUserGraphData(tempGraphData)
            }); 
          });

          let tempData1 = [];
        let tempGraphData1 =[]

        resultRef
        .where("userId", "==", userUID).orderBy('timeStamp','desc')
        .get()
        .then((snapshot) => {
          // console.log(snapshot)
          snapshot.docs.forEach((doc) => {
            tempData1.push({ ...doc.data() });
            tempGraphData1.push([doc.data().timeStamp, doc.data().wpm])
            // console.log(tempData)
            setCompareUserData(tempData1)
            setCompareUserGraphData(tempGraphData1)
          }); 
        });

    }

    useEffect(()=>{
        getData()
    },[ ])


  return (
    <div>
        <Graph graphData={loggenInUserGraphData} type='date' />
        <Graph graphData={compareUserGraphData} type='date'/>

    </div>
  )
}

export default ComparePage