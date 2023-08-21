import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDataLayerValue } from '../../DataLayer/DataLayer';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            text: 'Sales',
            color: "#fff"
        },

    },



};



export default function Graphs({ data }) {
    const [{ users }] = useDataLayerValue()
    const [registeredUserData, setRegisteredUserData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: 'Sells',
                data: [15000, 18000, 22000, 19000, 23000, 25000, 28000, 27000, 24000, 21000, 17000, 16000],
                color: "#fff",
                backgroundColor: 'rgb(47 62 177)',
            },
        ],
    })

    if (registeredUserData === null) {
        return <h1>Loading</h1>
    }
    else {
        return <Bar height={window.innerWidth < 600 ? "400px" : "auto"} options={options} data={registeredUserData} />;
    }
}
