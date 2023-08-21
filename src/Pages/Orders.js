import ArrowForwardIosSharpIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownward from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Plyr from 'plyr-react';
import "plyr-react/plyr.css";
import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import timestampConverter from '../util/timestampConverter';
/* eslint-disable */
function ReviewContent() {
    const [{ placed_orders }] = useDataLayerValue()
    const [data, setData] = useState(placed_orders);
    const [curruntVideo, setCurruntVideo] = useState(null)
    const [open, setOpen] = useState(false)
    const [isReviewing, setIsReviewing] = useState(false)
    const deleteItem = (id) => {
        Swal.fire(
            'Do you really want to delelte content?',
            '',
            'warning'
        ).then(() => {
            Swal.fire(
                'Deleted Successfull',
                "",
                'success'
            )
        })
    }
    const acceptContent = (item) => {
        return () => {
            Swal.fire("Video Upload was successfull", "", "success")
        }
    }
    return (

        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{ m: 1, color: 'text.primary', }}
                    variant="h4"
                >
                    Orders
                </Typography>
            </Box>

            <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">
                <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#1f2937" }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Order Id.</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Submitted on</TableCell>
                                <TableCell style={{ textAlign: "center" }} colSpan={3}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <>
                                    <TableRow key={index + 1}>
                                        <TableCell >
                                            <Button onClick={() => setIsReviewing(!isReviewing)} >
                                                {
                                                    isReviewing ?
                                                        <ArrowDownward sx={{ fontSize: '2rem' }} /> :
                                                        <ArrowForwardIosSharpIcon sx={{ fontSize: '2rem' }} />

                                                }

                                            </Button>
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.customer}</TableCell>
                                        <TableCell>{item.total}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>{timestampConverter(Date.now())}</TableCell>
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
                                                            <Typography variant='h6'>
                                                                You can add components here
                                                            </Typography>
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