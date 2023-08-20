import React, { useEffect, useState } from 'react'
import SlideMenu from '../Components/SlideMenu'
import $ from 'jquery'
import SecondMenu from '../Components/SecondMenu'
import firebase from '../firebase'
import { imgExtRemover } from './AddItems'
import CategoriesTr from '../Components/CategoriesTr'
import Swal from 'sweetalert2'
function SliderImg() {
    const [data, setData] = useState({
        category: '',
        length: '',
        file: {},
        deleteId: '',
        cateList: []
    });
    const showAdd = () => {
        $('.add-cate').toggleClass('active')
    }
    useEffect(() => {
        const loadData = () => {
            firebase.database().ref('sliders/').on('value', (snapshot) => {
                const snapVal = snapshot.val();
                const fatched = [];
                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })

                    setData({
                        ...data,
                        cateList: fatched
                    })
                    console.log(fatched)
                }
            })

        }
        loadData()
    },
        [])
    const handelChange = (val) => {
        setData({
            ...data,
            file: val.target.files[0]
        })
    }

    const addCate = () => {
        var TIME_STEMP = Date.now()

        firebase.storage().ref("sliders/").child(`${TIME_STEMP}.${imgExtRemover(data.file.name)}`)
            .put(data.file)
            .then(() => {
                firebase.storage().ref("sliders/").child(`${TIME_STEMP}.${imgExtRemover(data.file.name)}`)
                    .getDownloadURL().then((imgUrl) => {
                        firebase.database().ref("sliders/").push({
                            imgUrl: imgUrl
                        }).then(() => {
                            Swal.fire("Slider image uploaded successfully")
                        })
                    })
            })

    }
    const enterData = (keycode) => {
        if (keycode.code === "Enter") {
            addCate();
        }
    }
    // const loadData = () => {
    //     firebase.database().ref('categories/').on('value', (snapshot) => {
    //         const snapVal = snapshot.val();
    //         const fatched = [];
    //         console.log(snapVal)
    //         for (let id in snapVal) {
    //             fatched.push({ id, ...snapVal[id] })

    //             setData({
    //                 ...data,
    //                 length: snapshot.numChildren(),
    //                 cateList: fatched
    //             })
    //             console.log(fatched)
    //         }
    //     })
    // }

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
            <div className="main nav-active" >
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <div className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Edit Catrgories" url="/edit-categories" />
                        <div className="container smart-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="title">All Categories</h4>
                                <div className="add-cate text-success d-flex">
                                    <div className="input-cate">

                                        <input onKeyPressCapture={enterData} onChange={handelChange} type="file" />
                                        <button onClick={addCate}><i className="fa fa-plus"></i></button>
                                    </div>
                                    <div className="add-btn" onClick={showAdd}> <span className="mx-3">Add Categories</span><i className="fa fa-plus "></i></div>
                                </div>
                            </div>
                            {
                                data.cateList.map((item, index) => {
                                    return (
                                        <div>
                                            index: {index+1} <i className="fa fa-trash text-danger" onClick={()=>{firebase.database().ref("sliders/").child(item.id).remove()}}></i>
                                            <img className="d-block w-100" src={item.imgUrl} alt="First slide" />
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default SliderImg
