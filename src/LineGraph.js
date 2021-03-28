import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const buildChartData = (data, caseType) => {
         let chartData = []
         let lastDataPoint;
        
        for (let date in data.cases) {
          if(lastDataPoint){
                let newDataPoint = {
                 x: date,
                 y: data[caseType][date] - lastDataPoint,
                }
            chartData.push(newDataPoint)
         } 
          lastDataPoint = data[caseType][date]
        }
         return chartData;
      }

function LineGraph( { caseType = 'cases' }) {

    const [data, setData] = useState({})

    const options = {
        legend: { 
            display: false,
        },
        elements: { 
            point: { 
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data){
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks:{
                        callback: function (value, index, values){
                            return numeral(value).format("0a")
                        },
                    },
                },
            ],
        }
    }

    useEffect(() => {
        const fetchData = async () => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=7')
        .then(response => response.json()).then(data => {
            console.log(data)
            const chartData = buildChartData(data, 'cases')
            setData(chartData)
        });
    };
     fetchData()
    }, [caseType])

      
    
    return (
        <div>
            {data?.length > 0 && (
            <Line 
             options={options}
             data ={{
                datasets:[{
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#cc1034",
                    data: data,
                },
            ],
             }}
            />
            )}
        </div>
    )
}

export default LineGraph
