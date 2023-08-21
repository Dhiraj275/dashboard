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
import { useDataLayerValue } from '../DataLayer/DataLayer';
/* eslint-disable */
function ContactMails() {
    const [{ contactMails }] = useDataLayerValue()
    const [data, setData] = useState(contactMails);
    const deleteItem = (id) => {
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
    return (
        <>
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
                                <TableCell>Name</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell className="text-center">Opration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((list, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{list.email}</TableCell>
                                    <TableCell>{list.name}</TableCell>
                                    <TableCell>{list.message}</TableCell>
                                    <TableCell onClick={() => deleteItem(list.id)} className="text-center"><i style={{ cursor: 'pointer' }} className="fa fa-trash text-danger"></i></TableCell>
                                    {/* <TableCell style={{ minWidth: 185 }}>{timestamp}</td> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )
}

export default ContactMails