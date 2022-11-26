import {
  CircularProgress,
  GlobalStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Graph from "../components/Graph";
import { useTheme } from "../context/Theme";
import { auth, db } from "../FirebaseConfig";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading] =useAuthState(auth)
  const [graphData,setGraphData]=useState([])
  const {theme}=useTheme()
  const [dataLoading,setDataLoading]=useState(true)


  const fetchData = () => {
    const resultRef = db.collection("Results");
    let tempData = [];
    let tempGraphData =[]
    // console.log(auth.currentUser)
    const { uid } = auth.currentUser;
    // console.log(uid)
    resultRef
      .where("userId", "==", uid).orderBy('timeStamp','desc')
      .get()
      .then((snapshot) => {
        console.log(snapshot)
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp, doc.data().wpm])
          // console.log(tempData)
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse())
        setDataLoading(false)
      });
  };
 

  useEffect(() => {
    if(!loading){
      fetchData();
    }
  }, [loading]);

  if(loading || dataLoading){
    return <div className="loading" >
      <CircularProgress size={200} style={{color:theme.title}} />
    </div> 
      
  }

  return (
    <div className="canvas">
      <div className="user-profile">
        <div className="user">
        <div className="picture">
          <AccountCircleSharpIcon style={{display:'block', transform:'scale(5)',  margin:'auto', marginTop:'3rem'}}  />
        </div>
        <div className="info">
          <div className="email">
            {user.email}
          </div>
          <div className="joined-on">
            {user.metadata.creationTime}
          </div>
        </div>
        </div>
        <div className="total-times">
          <span>
            No of tests taken - {data.length}
          </span>
        </div>
      </div>
      <div  className="result-graph">
      <Graph graphData={graphData} type='date' />
      </div>

      <div className="table">
        <TableContainer style={{maxHeight:'30rem'}} >
          <TableHead>
            <TableRow>
              <TableCell style={{color:theme.title, textAlign:'center'}} >wpm</TableCell>

              <TableCell style={{color:theme.title, textAlign:'center'}}>accuracy</TableCell>

              <TableCell style={{color:theme.title, textAlign:'center'}}>characters</TableCell>

              <TableCell style={{color:theme.title, textAlign:'center'}}>date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i) => (
              <TableRow>
                <TableCell style={{color:theme.title, textAlign:'center'}}>
                  {i.wpm}
                </TableCell>

                <TableCell style={{color:theme.title, textAlign:'center'}}>
                  {i.accuracy}
                </TableCell>

                <TableCell style={{color:theme.title, textAlign:'center'}}>
                  {i.characters}
                </TableCell>

                <TableCell style={{color:theme.title, textAlign:'center'}}>
                  {i.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserPage;
