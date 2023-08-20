import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import firebase from '../firebase';
/* eslint-disable */
function ContactMails() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const loadData = () => {
            async function getData() {
                firebase.database().ref('messages/').on('value', (snapshot) => {
                    const rawUserData = []
                    var snapVal = snapshot.val();
                    for (let id in snapVal) {
                        rawUserData.push({ ...snapVal[id], id: id })
                    }
                    setData(rawUserData.reverse())
                })


            }
            getData()
        }
        loadData()
    }, [])
    const deleteItem = (id) => {
        Swal.fire(
            'Do you really want to delelte category?',
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
                                All Mails
                            </Typography>
                        </Box>

                        <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">
                            <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                                        <TableRow>
                                            <TableCell>Sr No.</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell className="text-center">Opration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((list, index) => (
                                            <TableRow key={index + 1}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{list.email}</TableCell>
                                                <TableCell>{list.message}</TableCell>
                                                <TableCell onClick={() => deleteItem(list.id)} className="text-center"><i style={{ cursor: 'pointer' }} className="fa fa-trash text-danger"></i></TableCell>
                                                {/* <TableCell style={{ minWidth: 185 }}>{timestamp}</td> */}
                                            </TableRow>
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

export default ContactMails