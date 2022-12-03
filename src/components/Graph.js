
import React from 'react'
import {Line} from 'react-chartjs-2'

import { useTheme } from '../context/Theme'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Chart
} from 'chart.js'
// import { useTheme } from 'styled-components'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = ({graphData,type}) => {
    const {theme}=useTheme()
    Chart.defaults.color=theme.title
  return (
    <div>
{/* {console.log(graphData)} */}
<Line

data={
    {
        labels:graphData.map(i=>(type==='date')?(i[0].toDate().toLocaleString("en-US",{
            year: "numeric",
    month: "short",
    day: "numeric"
        })): (i[0]+1)),   //x-axis
        datasets:[           //y-axis
            {       
                data:graphData.map(i=>i[1]),
                label:'wpm',
                borderColor: theme.title,
                // backdropColor:'rgba(255,255,255,0.75)'
            }
        ]        
    }
}
>
    
</Line>
    </div>
  )
}

export default Graph
