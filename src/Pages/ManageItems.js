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
import Select from "../Components/UI/Select"
import MenuItem from '@mui/material/MenuItem';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import Input from '../Components/UI/Input';
function ManageItems() {
    const [{ products }] = useDataLayerValue()
    return (

        <>
            <Box sx={{ display: "flex", mb: 2, justifyContent: "space-between" }}>
                <Typography
                    sx={{ m: 1, color: 'text.primary', }}
                    variant="h4"
                >
                    All Products
                </Typography>
                <Link to={"/add-item"}>
                    <Button variant='contained'>
                        Add Products
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
                                    PRICE
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    AVAILABILITY
                                </TableCell>
                                <TableCell>
                                    CATEGORY
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((video) => {
                                return <ProductRow key={video.id} item={video} />
                            })}
                        </TableBody>
                    </Table>


                </TableContainer>
            </Box>
        </>

    )
}
const ProductRow = ({ item }) => {
    const [open, setOpen] = useState(false)
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
                    {item.name}
                </TableCell>
                <TableCell>
                    {item.price}
                </TableCell>
                <TableCell>
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <span style={{ width: "30px", display: "block", height: "6px", borderRadius: "10px", background: `${item.availability ? "#10b981" : "red"}` }}></span>
                    </div>
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

const EditItem = ({ item }) => {
    const [{ category }] = useDataLayerValue()
    return (
        <TableRow>
            <TableCell colSpan={5}>
                <Container>
                    <Box paddingY={"20px"}>
                        <h6>Edit Details</h6>
                        {
                            item.availability === true
                                ?
                                <Button variant="contained"
                                    sx={{ mr: 4 }}>
                                    Unlist
                                </Button>
                                :
                                <Button variant="contained"
                                    sx={{ mr: 4 }}>
                                    list
                                </Button>
                        }
                        <form>
                            <Grid container mt={3} spacing={2}>
                                <Grid px={2} md={6}>
                                    <Input
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        required
                                        defaultValue={item.name}
                                    />
                                </Grid>

                                <Grid px={2} md={6}>
                                    <Select
                                        label={"Category"}
                                        defaultValue={item.category}
                                    >
                                        {category.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                sx={{
                                                    color: "text.primary", backgroundColor: "#111827", '&:hover': {
                                                    },
                                                }}
                                                selected value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>


                                </Grid>
                                <Grid px={2} md={4}>

                                    <Button type="submit" fullWidth variant={"contained"}>
                                        Update Details
                                    </Button>
                                </Grid>
                                <Grid px={2} md={8}>
                                    <textarea
                                        value={item.description}
                                    />
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
