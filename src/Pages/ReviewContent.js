import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import firebase from '../firebase';
import Plyr from 'plyr-react';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import Backdrop from '@mui/material/Backdrop';
import "plyr-react/plyr.css";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddIcon from '@mui/icons-material/Add'
import timestampConverter from '../util/timestampConverter';
/* eslint-disable */
function ReviewContent() {
    const [data, setData] = useState([]);
    const [curruntVideo, setCurruntVideo] = useState(null)
    const [open, setOpen] = useState(false)
    const [isReviewing, setIsReviewing] = useState(false)
    useEffect(() => {
        const loadData = () => {
            async function getData() {
                firebase.database().ref('submitted_content/').on('value', (snapshot) => {
                    const content = []
                    var snapVal = snapshot.val();
                    for (let id in snapVal) {
                        content.push({ ...snapVal[id], id: id })
                    }
                    setData(content.reverse())
                })


            }
            getData()
        }
        loadData()
    }, [])
    const deleteItem = (id) => {
        Swal.fire(
            'Do you really want to delelte content?',
            '',
            'warning'
        ).then(() => {

            const ItemRef = firebase.database().ref('contactMail/').child(id);
            ItemRef.remove().then(() => {
                Swal.fire(
                    'Deleted Successfull',
                    "",
                    'success'
                )
            })
        })
    }
    const acceptContent = (item) => {
        return () => {
            firebase.database().ref("videos").push({
                ...item,
                name: item.video_name,
                description: item.video_description,
                videoUrl: null,
                video_description: null,
                id: null,
                video_name: null
            }).then((event) => {
                var videoId = event.key
                firebase.database().ref("source").child(videoId).set({ 1080: item.videoUrl }).then(() => {
                    Swal.fire("Video Upload was successfull", "", "success")
                })
            })
        }
    }
    return (

        <>
            <SlideMenu title="Edit Catrgories" url="/edit-categories" />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
                open={open}
            >
                <CloseIcon
                    onClick={() => setOpen(false)}
                    style={{ position: "fixed", top: 10, right: 10, fontSize: 40, color: "#fff", cursor: "pointer" }}
                />
                {
                    curruntVideo && <VideoComponent videoData={curruntVideo} />
                }
            </Backdrop>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    // width: "100%"
                    display: "flex",
                    flex: 1,
                }}
                className="main-display edit-categories"
            >
                <div className="main-child">
                    <SecondMenu title="Manage orders" url="/orders" />
                    <div className="container smart-card">
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                sx={{ m: 1, color: 'text.primary', }}
                                variant="h4"
                            >
                                Review Content
                            </Typography>
                        </Box>

                        <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">
                            <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Sr No.</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Category</TableCell>
                                            <TableCell>Production Name</TableCell>
                                            <TableCell>Submitted on</TableCell>
                                            <TableCell style={{ textAlign: "center" }} colSpan={3}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item, index) => (
                                            <>
                                                <TableRow key={index + 1}>
                                                    <TableCell >
                                                        <ArrowForwardIosSharpIcon onClick={() => setIsReviewing(!isReviewing)} />
                                                    </TableCell>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{item.video_name}</TableCell>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell>{item.production_name}</TableCell>
                                                    <TableCell>{timestampConverter(item.TIMESTAMP)}</TableCell>
                                                    <TableCell>
                                                        <PlayCircleFilledOutlinedIcon
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setCurruntVideo(item); setOpen(true) }}
                                                            color="secondary"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DeleteIcon
                                                            color="error"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => deleteItem(item.id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <a download={item.video_name} href={item.videoUrl} >
                                                            <DownloadForOfflineIcon
                                                                color="success"
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                                {
                                                    isReviewing &&
                                                    <TableRow>
                                                        <TableCell colSpan={9}>
                                                            <Container>
                                                                <Grid container>
                                                                    <Grid item md={3}>
                                                                        <h5>
                                                                            Description
                                                                        </h5>
                                                                        <p dangerouslySetInnerHTML={{ __html: item.video_description.replace("\n", "<br />") }} />
                                                                        <div className="mt-2">
                                                                            <b>Director</b>: {item.director_name} <br />
                                                                            <b>Producer</b>: {item.producer_name} <br />
                                                                            <b>Writer</b>: {item.writer_name} <br />
                                                                        </div>
                                                                        <Button onClick={acceptContent(item)} sx={{ mt: 2 }} variant='contained' color="info">
                                                                            Accept
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item md={9}>
                                                                        <h5>
                                                                            Casts
                                                                        </h5>
                                                                        <Casts item={item} />
                                                                    </Grid>
                                                                </Grid>
                                                            </Container>
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </div>
            </Box>
        </>
    )
}
const Casts = ({ item }) => {
    const castsArr = [];
    for (let id in item.casts) {
        castsArr.push({ ...item.casts[id] })
    }


    return (
        <div className='d-flex justify-content-around'>
            {
                castsArr.map((item, index) => {
                    return <CastCard item={item} index={index} />
                })
            }
        </div>

    )
}
const CastCard = ({ item, index }) => {
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
const VideoComponent = ({ videoData }) => {
    const videoRef = useRef()
    const plyrProps = {
        options: {
            keyboard: {
                focused: true, global: true
            }
        },
    }
    return (
        <Plyr
            ref={videoRef}
            style={{ height: "90vh" }}
            source={{
                type: 'video',
                title: 'Example title',
                poster: videoData.coverImgUrl,
                sources: [
                    {
                        src: videoData.videoUrl,
                        type: 'video/mp4',
                        size: 1080,
                    },
                ],
                previewThumbnails: {
                    src: videoData.coverImgUrl,
                }
            }
            }
            {...plyrProps}
        />
    )
}
export default ReviewContent