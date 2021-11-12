import React from 'react';
import { Line } from "react-chartjs-2";

const Chart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Total Sales",
            data: [12000, 19000, 3000, 5000, 2000, 3000, 12000, 19000, 3000, 5000, 2000, 3000],
            fill: false,
            backgroundColor: "rgb(146, 119, 255)",
            borderColor: "#fff",
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              fontColor: "#fff",
            }
          },
        },
        responsive: true,
      };
    
    return (
        <div className="chart">
           <Line data={data} options={options} /> 
        </div>
    )
}

export default Chart
