import { Box, Button, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
/* eslint-disable */
function EditCategories() {
    const [itemList, setItemList] = useState([]);
    const [{ category }] = useDataLayerValue()
    const [data, setData] = useState({
        category: '',
    });
    const handelChange = (val) => {
        setData({
            ...data,
            category: val.target.value
        })

    }
    const enterData = (keycode) => {
        if (keycode.code === "Enter") {
            addCate();
        }
    }
    const addCate = () => {
        if (data.category !== "") {
            const categories = firebase.database().ref("categories/")
            categories.push({
                categoryName: data.category,
            })
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
                    <div className="container smart-card">
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography
                                sx={{ m: 1, color: 'text.primary', }}
                                variant="h4"
                            >
                                Categories
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Box sx={{ marginRight: "20px" }}>
                                    <TextField onKeyUp={enterData} onChange={handelChange} variant="outlined" sx={{ marginLeft: 2 }} label="Enter Category" />
                                </Box>

                                <Button onClick={addCate} variant='contained'>
                                    Add Category
                                </Button>

                            </Box>
                        </Box>

                        <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">
                            <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Box>Sr No.</Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box>Name</Box>
                                            </TableCell>
                                            <TableCell colSpan={2} align="center">
                                                <Box>Operations</Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {category.map((list, index) => (
                                            <ItemsTr list={list} index={index} />
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

function ItemsTr(props) {
    const deleteItem = () => {
        Swal.fire(
            'Do you really want to delelte category?',
            '',
            'warning'
        ).then(() => {

            const ItemRef = firebase.database().ref('categories/').child(props.list.id);
            ItemRef.remove().then(() => {
                Swal.fire(
                    'Deleted Successfull',
                    "",
                    'success'
                )
            })



        })
    }
    var id = 0
    const onEdit = async () => {
        const { value: order } = await Swal.fire({
            title: 'Edit Category',
            input: 'number',
            inputLabel: 'Edit Order',
            // inputValue: ,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })

        if (order) {
            firebase.database().ref("categories/").child(parseInt(order)).set({ ...props.list }).then(() => {
                firebase.database().ref("categories/").child(props.list.id).remove().then(() => {
                    Swal.fire("Item edited successfully", "", "success")
                })
            })
        }
    }

    return (

        <TableRow
            key={props.list.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{props.index + 1}</TableCell>
            <TableCell align="left">{props.list.categoryName}</TableCell>
            <TableCell align="center" key={props.index + 5} className="text-center">
                <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
            </TableCell>
            <TableCell align="center">
                <i onClick={onEdit} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-edit text-success"></i>
            </TableCell>
        </TableRow>
    )
}
export default EditCategories