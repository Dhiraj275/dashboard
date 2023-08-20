import { Box, Breadcrumbs, Button, Container, Backdrop, FormControl, Grid, IconButton, InputLabel, Link, ListItem, MenuItem, Select, TextField, Typography, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
// import Head from 'next/head';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MyEditor from '../Components/MyEditor';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import ClearIcon from '@mui/icons-material/Clear';
import firebase from "../firebase"
import Swal from 'sweetalert2';
import upload_image from "../images/upload_image.png"
function CreateVideosChild() {
    const [isUploading, setIsUploading] = useState(false)
    const [customForm, setCustomForm] = useState({
        coverImg: null,
        videoFile: null
    })
    const [uploadProgress, setUpladProgress] = useState(0)
    const [description, setDescription] = useState()


    const formik = useFormik({
        initialValues: {
            name: '',
            category: "",
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'Video Name is required'),
            category: Yup
                .string()
                .max(255)
                .required(
                    'Category is required'),
        }),
        onSubmit: () => {
            var TIME_STEMP = Date.now()
            setIsUploading(true)
            const putCoverImg = firebase.storage().ref("coverImg/").child(`${TIME_STEMP}.${imgExtRemover(customForm.coverImg.name)}`).put(customForm.coverImg)

            putCoverImg.then(() => {
                const putVideo = firebase.storage().ref("videos/").child(`${TIME_STEMP}.${imgExtRemover(customForm.videoFile.name)}`).put(customForm.videoFile)
                putVideo.on("state_changed",
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUpladProgress(progress)
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                    },
                    () => {
                        firebase.storage().ref("coverImg/").child(`${TIME_STEMP}.${imgExtRemover(customForm.coverImg.name)}`).getDownloadURL().
                            then((coverImgUrl) => {
                                firebase.database().ref("videos").push({
                                    ...formik.values,
                                    description: description,
                                    coverImgUrl: coverImgUrl,
                                    TIMESTAMP: TIME_STEMP
                                }).then((event) => {
                                    var videoId = event.key
                                    firebase.storage().ref("videos/").child(`${TIME_STEMP}.${imgExtRemover(customForm.videoFile.name)}`).getDownloadURL().then((videoFileUrl) => {
                                        firebase.database().ref("source").child(videoId).set({ 720: videoFileUrl }).then(()=>{
                                            Swal.fire("Video Upload was successfull", "", "success")
                                        })
                                    })

                                })
                            })



                        console.log(customForm)
                    }
                )

            })

        }
    })

    const removeImg = (item) => {
        var temp = [...customForm.moreImg]
        temp.splice(temp.indexOf(item), 1)
        setCustomForm({ ...customForm, moreImg: temp, description: description })
    }
    const imgExtRemover = (name) => {
        var fileName = name;
        return fileName.split('.').pop()
    }
    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    const [{ brands, category }] = useDataLayerValue()
    return (
        <>
            <SlideMenu title="Edit Catrgories" url="/edit-categories" />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isUploading}
            >
                <Box sx={{ width: '60%' }}>
                    <LinearProgressWithLabel value={uploadProgress} />
                </Box>
            </Backdrop>
            <Box
                sx={{
                    bgcolor: 'neutral.900',
                    // width: "100%"
                    display: "flex",
                    flex: 1,
                }}
                className="main-display edit-categories"
            >
                <div className="main-child">
                    <SecondMenu title="Manage orders" url="/orders" />
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            component="main"
                            bgcolor={"#ffffff00"}
                            sx={{
                                flexGrow: 1,
                                py: 3,
                                mb: 10
                            }}
                        >
                            <Container maxWidth={false}>

                                <Typography
                                    sx={{ my: 1, color: 'text.primary', }}
                                    variant="h4"
                                >
                                    Add New Video
                                </Typography>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" href="/">
                                        Dashboard
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="/Video"
                                    >
                                        Add Video
                                    </Link>
                                    <Typography color="text.primary">Add Video</Typography>
                                </Breadcrumbs>

                                <Box style={{ marginTop: 40 }} py={5} px={4} sx={{ backgroundColor: 'neutral.700' }}>
                                    <Grid container spacing={2}>
                                        <Grid md={4}>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                Basic details
                                            </Typography>
                                        </Grid>
                                        <Grid md={8}>
                                            <TextField
                                                fullWidth
                                                error={Boolean(formik.touched.name && formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}
                                                name="name"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                id="outlined-basic"
                                                value={formik.values.name}
                                                label="Video Name"
                                                variant="outlined" />
                                            <MyEditor description={description} setDescription={setDescription} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box style={{ marginTop: 40 }} py={5} px={4} sx={{ backgroundColor: 'neutral.700' }}>
                                    <Grid container spacing={2}>
                                        <Grid md={4}>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                Files
                                            </Typography>
                                            <Typography variant="subtitle2" component="div" gutterBottom>
                                                Images will appear as the thumbnail
                                            </Typography>
                                            {
                                                customForm.videoFile && <video poster={customForm.coverImg && URL.createObjectURL(customForm.coverImg)} controls style={{ width: '100%' }} src={URL.createObjectURL(customForm.videoFile)}>
                                                </video>
                                            }
                                        </Grid>
                                        <Grid md={8}>
                                            <input
                                                accept="video"
                                                // className={classes.input}
                                                style={{ display: 'none' }}
                                                id="coverImg_file"
                                                // multiple
                                                type="file"
                                                onChange={(e) => { setCustomForm({ ...customForm, coverImg: e.target.files[0] }) }}
                                            />
                                            <label htmlFor="coverImg_file">
                                                <Box style={{ padding: "20px 40px", cursor: "pointer" }}>
                                                    <Grid container columnGap={4} >
                                                        <Grid sm={2} display="flex" justifyContent={"center"} sd={2}>
                                                            <img className="img_input" style={{ borderRadius: 10 }} src={upload_image} alt="" />
                                                        </Grid>
                                                        <Grid sm={8} sd={8}>
                                                            <Typography variant="h6" component="div" gutterBottom>
                                                                Select Cover Image
                                                            </Typography>
                                                            <Typography variant="subtitle2" component="div" gutterBottom>
                                                                Click to add images
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </label>
                                            {
                                                customForm.coverImg && <ListItem disablePadding>
                                                    <Box sx={{ width: "100%", p: "0px 20px", borderRadius: "5px", border: '1px solid rgb(45, 55, 72)' }}>
                                                        <Box display='flex' flexDirection={"row"} alignItems="center" justifyContent={"space-between"}>
                                                            <Typography component={"div"} variant='subtitle2'>
                                                                {customForm.coverImg.name}
                                                            </Typography>
                                                            <IconButton onClick={(e) => { setCustomForm({ ...customForm, coverImg: null }) }} edge="end" aria-label="delete">
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </ListItem>
                                            }
                                            <input
                                                // accept="image/*"
                                                // className={classes.input}
                                                style={{ display: 'none' }}
                                                id="moreImgs"
                                                type="file"
                                                onChange={(e) => {
                                                    setCustomForm({ ...customForm, videoFile: e.target.files[0] });
                                                    console.log(e.target.files[0])
                                                }}
                                            />
                                            <label htmlFor="moreImgs">
                                                <Box style={{ padding: "20px 40px", cursor: "pointer" }}>

                                                    <Grid container columnGap={4} >
                                                        <Grid sm={2} display="flex" justifyContent={"center"} sd={2}>
                                                            <img className="img_input" style={{ borderRadius: 10 }} src={upload_image} alt="" />
                                                        </Grid>
                                                        <Grid sm={8} sd={8}>
                                                            <Typography variant="h6" component="div" gutterBottom>
                                                                Select Video File
                                                            </Typography>
                                                            <Typography variant="subtitle2" component="div" gutterBottom>
                                                                Click to add File
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </label>
                                            {
                                                // customForm.videoFile.map((item, index) => {
                                                //     return (
                                                //         <List key={index}>
                                                //             <ListItem disablePadding>
                                                //                 <Box sx={{ width: "100%", p: "0px 20px", borderRadius: "5px", border: '1px solid rgb(45, 55, 72)' }}>
                                                //                     <Box display='flex' flexDirection={"row"} alignItems="center" justifyContent={"space-between"}>
                                                //                         <Typography component={"div"} variant='subtitle2'>
                                                //                             {item.name}
                                                //                         </Typography>
                                                //                         <IconButton onClick={() => removeImg(item)} edge="end" aria-label="delete">
                                                //                             <ClearIcon />
                                                //                         </IconButton>
                                                //                     </Box>
                                                //                 </Box>

                                                //             </ListItem>
                                                //         </List>
                                                //     )
                                                // })
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>



                                <Box style={{ marginTop: 40 }} py={5} px={4} sx={{ backgroundColor: 'neutral.700' }}>
                                    <Grid container >
                                        <Grid item sx={12} xs={12} md={4} sm={12}>
                                            <Typography mb={2} variant="h6" component="div" gutterBottom>
                                                Category
                                            </Typography>
                                        </Grid>
                                        <Grid item sx={12} xs={12} md={8} sm={12} >
                                            <Grid container>
                                                <Grid my={3} xs={12} sm={12}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                                        <Select
                                                            MenuProps={{
                                                                sx: {
                                                                    "&& .Mui-selected": {
                                                                        backgroundColor: "#192036"
                                                                    },
                                                                    "&& .Mui-selected:hover": {
                                                                        backgroundColor: "#192036"
                                                                    },
                                                                    "&& .MuiMenu-list": {
                                                                        backgroundColor: "#111827"
                                                                    }
                                                                }
                                                            }}
                                                            name="category"
                                                            error={Boolean(formik.touched.category && formik.errors.category)}
                                                            helperText={formik.touched.category && formik.errors.category}
                                                            value={formik.values.category}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            label="Category"
                                                        >
                                                            {
                                                                category.map((item, index) => {
                                                                    return (
                                                                        <MenuItem sx={{
                                                                            color: "text.primary", backgroundColor: "#111827", '&:hover': {
                                                                                // backgroundColor: itemDetail.cateogry === "" ? "#192036" : 'rgb(0,0,0)'
                                                                            },
                                                                        }} key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button type="submit" style={{ margin: "20px 0" }} variant="contained">
                                        Create
                                    </Button>
                                </div>

                            </Container>
                        </Box>
                    </form>

                </div >
            </Box >
        </>
    )
}
function CreateVideos() {
    return (
        // <DashboardLayout>
        <CreateVideosChild />
        // </DashboardLayout>
    )
}
export default CreateVideos