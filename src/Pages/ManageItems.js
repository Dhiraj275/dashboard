import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import firebase from '../firebase';
import {
    Box,
    Button, Container,
    Grid, Paper, TableContainer, TextField, Tooltip, Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import MyEditor from '../Components/MyEditor';
import { toUnitless } from '@mui/material/styles/cssUtils';
function ManageItems() {
    const [itemList, setItemList] = useState([]);
    const [cateList, setCateList] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [filterData, setFilterData] = useState([])
    const [{ videos }] = useDataLayerValue()

    const searchFilter = (e) => {
        const text = e.target.value
        if (text) {
            const newData = itemList.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            )
            setSearch(text)
            setFilterData(newData)
        }
        else {
            setSearch(text)
            setFilterData(itemList)
        }
    }
    return (

        <>
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
                    <div className="container smart-card manage-videos">
                        <Box sx={{ display: "flex", mb: 2, justifyContent: "space-between" }}>
                            <Typography
                                sx={{ m: 1, color: 'text.primary', }}
                                variant="h4"
                            >
                                All Videos
                            </Typography>
                            <Link to={"/add-item"}>
                                <Button variant='contained'>
                                    Add Video
                                </Button>
                            </Link>
                        </Box>


                        <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive" >
                            <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                                        <TableRow>
                                            <TableCell width={40}>

                                            </TableCell>
                                            <TableCell>
                                                NAME
                                            </TableCell>
                                            <TableCell>
                                                CATEGORY
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {videos.map((video) => {
                                            return <VideoTr key={video.id} item={video} />
                                        })}
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
const VideoTr = ({ item }) => {
    const [open, setOpen] = useState(false)
    // var timestamp = order.TIMESTAMP
    // var rawTime = String(new Date(timestamp))
    // var timestamp = rawTime.replace("GMT+0530 (India Standard Time)", "")
    return (
        <>
            <TableRow
                hover
                key={item.id}
            >
                <TableCell>
                    <Button onClick={() => open === true ? setOpen(false) : setOpen(true)} >
                        <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />
                    </Button>
                </TableCell>
                <TableCell>
                    <img src={item.coverImgUrl} style={{ width: "40px", borderRadius: "6px", marginRight: '10px' }} />
                    {item.name}
                </TableCell>
              

                <TableCell>
                    {item.category}
                </TableCell>

            </TableRow>
            {
                open &&
                <EditItem item={item} />
            }
        </>
    )
}
const CustomSelect = ({ children, label, defaultValue, handleFormChanges }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={defaultValue}
                    label={label}
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
const EditItem = ({ item }) => {
    const [{ category }] = useDataLayerValue()
    const countryOfOrigin = [
        "India", "United Kingdom"
    ]

    const [formData, setFormData] = useState({

    })
    const [description, setDescription] = useState(item.description)
    let name, value
    const handleFormChanges = (event) => {
        name = event.target.name;
        value = event.target.value;
        if (name === "newPrice" || name === "oldPrice") {
            value = parseInt(event.target.value)
        }
        setFormData({ ...formData, [name]: value });
    }
    const updateValues = (e) => {
        e.preventDefault()
        const updateObj = { ...item, ...formData, description: description }
        firebase.database().ref("videos/").child(item.id).set(updateObj).then(() => {
            Swal.fire("Item Updated", "", "success")
        })
    }
    const requestDelete = () => {
        firebase.database().ref("items").child(item.id).remove().then(() => {
            Swal.fire("Item deleted successfully", "", "success")
        })
    }
    const unlistProduct = () => {
        firebase.database().ref("items").child(item.id).set({
            ...item,
            id: null,
            listed: false
        }).then(() => {

            Swal.fire("Item unlisted", "", "success")
        })
    }
    const listProduct = () => {
        firebase.database().ref("items").child(item.id).set({
            ...item,
            id: null,
            listed: true
        }).then(() => {

            Swal.fire("Item listed", "", "success")
        })
    }
    return (
        <TableRow>
            <TableCell colSpan={5}>
                <Container>
                    <Box paddingY={"20px"}>
                        <h6>Edit Details</h6>
                        {
                            item.listed === true
                                ?
                                <Button variant="contained"
                                    onClick={unlistProduct}
                                    sx={{ mr: 4 }}>
                                    Unlist
                                </Button>
                                :
                                <Button variant="contained"
                                    onClick={listProduct}
                                    sx={{ mr: 4 }}>
                                    list
                                </Button>
                        }
                        {
                            item.TIME_STEMP + 1800000 > Date.now() &&
                            <Button
                                onClick={requestDelete}
                                color="error" variant="contained"
                            >Delete</Button>
                        }
                        <form onSubmit={updateValues}>
                            <Grid container mt={3} spacing={2}>
                                <Grid px={2} md={6}>
                                    <TextField
                                        sx={{
                                            mb: 3
                                        }}
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        onChange={handleFormChanges}
                                        required
                                        defaultValue={item.name}
                                    />
                                </Grid>

                                <Grid px={2} md={6}>
                                    <CustomSelect
                                        handleFormChanges={handleFormChanges}
                                        label={"Category"}
                                        defaultValue={item.category}
                                    >
                                        {category.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                sx={{
                                                    color: "text.primary", backgroundColor: "#111827", '&:hover': {
                                                        // backgroundColor: itemDetail.cateogry === "" ? "#192036" : 'rgb(0,0,0)'
                                                    },
                                                }}
                                                selected value={item.categoryName}>{item.categoryName}</MenuItem>
                                        ))}
                                    </CustomSelect>


                                </Grid>
                                <Grid px={2} md={4}>

                                    <Button type="submit" fullWidth variant={"contained"}>
                                        Update Details
                                    </Button>
                                </Grid>
                                <Grid px={2} md={8}>
                                    <textarea
                                        onChange={(e)=>setDescription(e.target.value)}
                                        value={description}
                                    />
                                    {/* <MyEditor setDescription={setDescription} description={description} /> */}
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </TableCell>
        </TableRow >
    )
}
export default ManageItems
export { CustomSelect }
