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
import { auth, db } from "../FirebaseConfig";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [user, loading] =useAuthState(auth)
  const [graphData,setGraphData]=useState([])


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
      });
  };
 

  useEffect(() => {
    if(!loading){
      fetchData();
    }
  }, [loading]);

  if(loading){
    return <CircularProgress size={200} />
  }

  return (
    <div className="canvas">
      <Graph graphData={graphData} type='date' />
      {/* <GlobalStyles  /> */}
      <div className="table">
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>wpm</TableCell>

              <TableCell>accuracy</TableCell>

              <TableCell>characters</TableCell>

              <TableCell>date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i) => (
              <TableRow>
                <TableCell>
                  {i.wpm}
                </TableCell>

                <TableCell>
                  {i.accuracy}
                </TableCell>

                <TableCell>
                  {i.characters}
                </TableCell>

                <TableCell>
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
