import { Box, Button, Typography } from '@mui/material';
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
import Input from '../Components/UI/Input';
/* eslint-disable */
function EditCategories() {
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
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{ m: 1, color: 'text.primary', }}
                    variant="h4"
                >
                    Categories
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ marginRight: "20px" }}>
                        <Input onKeyUp={enterData} onChange={handelChange} variant="outlined"  label="Enter Category" />
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

            Swal.fire(
                'Deleted Successfull',
                "",
                'success'
            )
        })
    }
    var id = 0
    const onEdit = async () => {
        const { value: order } = await Swal.fire({
            title: 'Edit Category',
            input: 'number',
            inputLabel: 'Edit Order',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
    }

    return (

        <TableRow
            key={props.list.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{props.index + 1}</TableCell>
            <TableCell align="left">{props.list}</TableCell>
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