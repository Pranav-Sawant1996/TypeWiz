import { borderColor } from '@mui/system'
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
    Legend
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

const Graph = ({graphData}) => {
    const {theme}=useTheme()
  return (
    <div>
{console.log(graphData)}
<Line
data={
    {
        labels:graphData.map(i=>i[0]+1),   //x-axis
        datasets:[           //y-axis
            {       
                data:graphData.map(i=>i[1]),
                label:'wpm',
                borderColor: theme.title
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
