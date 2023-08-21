import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: "#fff",
            }
        },
        title: {
            display: true,
            text: 'Revenue',
            color: "#fff"
        },
    },
    bezierCurve: false

};


export default function LineGraph() {
    const [data, setData] = useState(null)
    useEffect(() => {
        var processedData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: 'Users',
                    borderColor: 'rgb(47 62 177)',
                    backgroundColor: 'rgba(47, 62, 177, 0.5)',
                    data: [15000, 18000, 22000, 19000, 23000, 25000, 28000, 27000, 24000, 21000, 17000, 16000],
                    color: "#fff",
                    backgroundColor: 'rgb(47 62 177)',
                },
            ],
        }
        setData(processedData)
    }, [])
    if (data === null) {
        return <h1>Loading</h1>
    }
    else {
        return <Line height={window.innerWidth < 600 ? "400px" : "auto"} options={options} data={data} />;
    }
}
