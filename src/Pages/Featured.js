import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Typography, Backdrop, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from 'sweetalert2';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
/* eslint-disable */
function Featured() {
    const [data, setData] = useState([
    ]);
    const [isAdding, setIsAdding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        id: ""
    })
    const imgExtRemover = (name) => {
        var fileName = name;
        return fileName.split('.').pop()
    }
    const [selectedVideo, setSelectedVideo] = useState({})
    const [{ videos }] = useDataLayerValue()
    let name, value
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        if (name === "newPrice" || name === "oldPrice") {
            value = parseInt(event.target.value)
        }
        setFormData({ ...formData, [name]: value });
    }
    useEffect(() => {
        const loadData = () => {
            async function getData() {
                firebase.database().ref('featured/').on('value', (snapshot) => {
                    const rawUserData = []
                    var snapVal = snapshot.val();
                    for (let id in snapVal) {
                        rawUserData.push({ ...snapVal[id], index: parseInt(id) })
                    }
                    setData(rawUserData)
                })

            }
            getData()
        }
        loadData()
    }, [])

    const submitForm = () => {
        const TIMESTAMP = Date.now()
        firebase.storage().ref("featured").child(`${TIMESTAMP}.${imgExtRemover(formData.coverImg.name)}`).put(formData.coverImg).then(() => {
            firebase.storage().ref("featured").child(`${TIMESTAMP}.${imgExtRemover(formData.coverImg.name)}`).getDownloadURL().then((url) => {
                const tempData = [...data]
                tempData.push({ ...formData, imgUrl: url, id: selectedVideo.id, index: null })
                firebase.database().ref("/featured").set(tempData).then(() => { setIsAdding(false) })
                // console.log(tempData)
            })
        })
    }
    const updateData = () => {
        const TIMESTAMP = Date.now()
        if (formData.coverImg) {
            var imgName = formData.imgUrl.split("/")[7].replace("featured%2F", "").split("?")[0]
            firebase.storage().ref("featured").child(imgName).delete().then(
                () => {
                    firebase.storage().ref("featured").child(`${TIMESTAMP}.${imgExtRemover(formData.coverImg.name)}`).put(formData.coverImg).then(() => {
                        firebase.storage().ref("featured").child(`${TIMESTAMP}.${imgExtRemover(formData.coverImg.name)}`).getDownloadURL().then((url) => {
                            var tempData = [...data]
                            tempData[formData.index] = { ...formData, imgUrl: url, id: selectedVideo.id, coverImg: null }
                            firebase.database().ref("/featured").set(tempData).then(() => {
                                setData(tempData)
                                window.location.reload()
                                setIsUpdating(false)
                            })
                        })
                    })
                }
            )
        }
        else {
            var tempData = [...data]
            tempData[formData.index] = { ...formData, id: selectedVideo.id, coverImg: null }
            firebase.database().ref("/featured").set({ ...tempData, index: null }).then(() => {
                setData(tempData)
                window.location.reload()
                setIsUpdating(false)
            })
        }
    }
    const handleVideoChange = (e) => {
        var id = e.target.value
        const videoData = videos.filter(e => id === e.id)
        setSelectedVideo(videoData[0])
        setFormData({ ...formData, name: videoData[0].name })
    }
    const updateFeatured = () => {
        firebase.database().ref("featured").set(data)
    }
    const deleteItem = (item) => {
        Swal.fire(
            'Do you really want to delelte category?',
            '',
            'warning'
        ).then(() => {

            firebase.database().ref("featured").child(formData.index).remove().catch((e) => console.log(e))
                .then(() => {
                    Swal.fire(
                        'Deleted Successfull',
                        "",
                        'success'
                    ).then(()=>{
                        window.location.reload()
                    })
                })
        })
    }
    return (

        <>
            {isAdding &&
                <div className="backdrop">
                    <Box style={{
                        width: "70%",
                        background: "#0b0f19",

                    }}>
                        <Box style={{ padding: "20px 40px" }}>
                            <CustomSelect
                                defaultValue={formData.id}
                                handleFormChanges={handleVideoChange}
                                label={"Select Video"}
                            >
                                {
                                    videos.map((item, index) => {
                                        return (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </CustomSelect>
                            <TextField sx={{ my: 2 }}
                                fullWidth
                                name="name"
                                value={formData.name}
                                label="Title"
                                onChange={handleFormChanges}
                                required
                            />

                            <TextField sx={{ my: 2 }}
                                fullWidth
                                name="shortDesc"
                                label="Short Description"
                                value={formData.shortDesc}
                                onChange={handleFormChanges}
                                required
                            />
                            <Grid container p={2}>
                                <Grid item>
                                    <Grid container spacing={2}>
                                        <Grid md={6}>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                Photo
                                            </Typography>
                                            {formData.coverImg && <img src={URL.createObjectURL(formData.coverImg)} className="img-fluid" alt="" />}
                                            {formData.imgUrl && <img src={formData.imgUrl} className="img-fluid" alt="" />}
                                        </Grid>
                                        <Grid md={6}>
                                            <input
                                                accept="videos"
                                                style={{ display: 'none' }}
                                                id="coverImg_file"
                                                type="file"
                                                onChange={(e) => { setFormData({ ...formData, coverImg: e.target.files[0] }) }}
                                            />
                                            <label htmlFor="coverImg_file">
                                                <Box style={{ padding: "20px 40px", cursor: "pointer" }}>
                                                    <Grid container columnGap={4} >
                                                        <Grid sm={2} display="flex" justifyContent={"center"} sd={2}>
                                                            <img className="img_input" src="https://material-kit-pro-react.devias.io/static/undraw_add_file2_gvbb.svg" alt="" />
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button onClick={submitForm} variant="contained" sx={{ mr: 2 }}>
                                Submit
                            </Button>
                            <Button onClick={() => { setIsAdding(false) }} color="error" variant="contained">
                                Cancle
                            </Button>
                        </Box>
                    </Box>

                </div>
            }
            {isUpdating &&
                <div className="backdrop">
                    <Box style={{
                        width: "70%",
                        background: "#0b0f19",

                    }}>
                        <Box style={{ padding: "20px 40px" }}>
                            <CustomSelect
                                defaultValue={formData.id}
                                handleFormChanges={handleVideoChange}
                                label={"Select Video"}
                            >
                                {
                                    videos.map((item, index) => {
                                        return (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </CustomSelect>
                            <TextField sx={{ my: 2 }}
                                fullWidth
                                name="name"
                                value={formData.name}
                                label="Title"
                                onChange={handleFormChanges}
                                required
                            />

                            <TextField sx={{ my: 2 }}
                                fullWidth
                                name="shortDesc"
                                label="Short Description"
                                value={formData.shortDesc}
                                onChange={handleFormChanges}
                                required
                            />
                            <Grid container p={2}>
                                <Grid item>
                                    <Grid container spacing={2}>
                                        <Grid md={6}>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                Photo
                                            </Typography>
                                            {formData.coverImg && <img src={URL.createObjectURL(formData.coverImg)} className="img-fluid" alt="" />}
                                            {formData.imgUrl && <img src={formData.imgUrl} className="img-fluid" alt="" />}
                                        </Grid>
                                        <Grid md={6}>
                                            <input
                                                accept="videos"
                                                style={{ display: 'none' }}
                                                id="coverImg_file"
                                                type="file"
                                                onChange={(e) => { setFormData({ ...formData, coverImg: e.target.files[0] }) }}
                                            />
                                            <label htmlFor="coverImg_file">
                                                <Box style={{ padding: "20px 40px", cursor: "pointer" }}>
                                                    <Grid container columnGap={4} >
                                                        <Grid sm={2} display="flex" justifyContent={"center"} sd={2}>
                                                            <img className="img_input" src="https://material-kit-pro-react.devias.io/static/undraw_add_file2_gvbb.svg" alt="" />
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button onClick={updateData} variant="contained" sx={{ mr: 2 }}>
                                Submit
                            </Button>
                            <Button onClick={deleteItem} color="error" variant="contained" sx={{ mr: 2 }}>
                                Delete
                            </Button>
                            <Button onClick={() => { setIsUpdating(false) }} color="error" variant="contained">
                                Cancle
                            </Button>
                        </Box>
                    </Box>

                </div>
            }
            <SlideMenu title="Edit Catrgories" url="/edit-categories" />
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
                                Featured Videos
                            </Typography>
                            <Button onClick={updateFeatured} variant="contained">
                                Update
                            </Button>
                            <Button onClick={() => { setIsAdding(true) }} variant="contained">
                                <AddIcon />
                            </Button>
                        </Box>

                        {
                            data.length > 0 &&
                            <DragDrop setIsUpdating={setIsUpdating} setSelectedVideo={setSelectedVideo} setFormData={setFormData} setData={setData} data={data} />
                        }

                    </div>
                </div>
            </Box>
        </>
    )
}

function DragDrop({ data, setData, setIsUpdating, setSelectedVideo, setFormData }) {

    const [itemList, setItemList] = useState(data);
    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...data];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setItemList(updatedList);
        setData(updatedList)
    };
    const editItem = (item) => {
        setIsUpdating(true)
        setFormData(item)
        setSelectedVideo({ id: item.id })
    }

    return (
        <div className="App">
            <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                    {(provided) => (
                        <div
                            className="list-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {itemList.map((item, index) => (
                                <Draggable key={item.name} draggableId={item.name} index={index}>
                                    {(provided) => (
                                        <div
                                            className="item-container"
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            <div className="d-flex">
                                                {item.imgUrl && <img className="img-fluid" src={item.imgUrl} alt="" />}
                                                <div>
                                                    <h4>
                                                        {item.name}
                                                    </h4>
                                                    <p>
                                                        {item.shortDesc}
                                                    </p>
                                                    <EditIcon style={{ cursor: "pointer", }} onClick={() => editItem(item)} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
const CustomSelect = ({ children, label, handleFormChanges, defaultValue }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <FormControl sx={{ my: 2 }} fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={label}
                    defaultValue={defaultValue}
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
                    // value={changedStatus}
                    onChange={handleFormChanges}
                    required
                >
                    {
                        children
                    }
                </Select>
            </FormControl>
        </div>
    )
}
export default Featured