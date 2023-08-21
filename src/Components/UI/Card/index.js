import "plyr-react/plyr.css";
import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
const Card = ({ item, index }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        console.log(item)
        firebase.database().ref('actors/').child(item.id).on('value', (snapshot) => {
            var snapVal = snapshot.val();
            setData(snapVal)
        })
    }, [])
    return (
        <div key={index} className='cast-box'>
            <input accept='image/*' id={`add-image-${index}`} onChange={(e) => handleImageChange(e, index)} class="add-image-input" type="file" />
            <div className="img-box">
                <img src={data.actorImg ? data.actorImg : "/images/cast.svg"} />
            </div>
            <div className="info">
                <h5>{data.name}</h5>
                <h6>{item.role}</h6>
            </div>
        </div>
    )
}
export default Card