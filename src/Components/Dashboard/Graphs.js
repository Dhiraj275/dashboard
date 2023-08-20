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
// import faker from 'faker';

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
                // fontColor: '#fff',
                color: "#fff",
            }
        },
        title: {
            display: true,
            text: 'Registed Users',
            color: "#fff"
        },
        
    },
    


};



export default function Graphs({ data }) {
    const [{ itemToVerify, products, users }] = useDataLayerValue()
    const [registeredUserData, setRegisteredUserData] = useState(null)
    useEffect(() => {
        const rawStates = []
        const labels = []
        const usersinArr = []
        users.map((item) => {
            rawStates.push(item.state)
        })
        const counts = {};
        for (const num of rawStates) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        console.log(counts)
        var keys = Object.keys(counts)
        for (let i = 0; i < keys.length; i++) {
            if (counts[keys[i]]>1) {
                labels.push(keys[i])
                usersinArr.push(counts[keys[i]])
            }
        }
        setRegisteredUserData({
            labels,
            datasets: [
                {
                    label: 'Users',
                    data: usersinArr,
                    color: "#fff",
                    backgroundColor: 'rgb(47 62 177)',
                },
            ],
        })


    }, [])
    if (registeredUserData === null) {
        return <h1>Loading</h1>
    }
    else {
        return <Bar height={window.innerWidth<600?"400px": "auto"} options={options} data={registeredUserData} />;
    }
}
