import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SecondMenu from '../../Components/SecondMenu'
import SlideMenu from '../../Components/SlideMenu'
import UserTR from '../../Components/UserTR'
import firebase from '../../firebase'
import { Box, Typography } from '@mui/material';
/* eslint-disable */
function UserData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = () => {
            async function getData() {
                firebase.database().ref('users/').on('value', (snapshot) => {
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
    // firebase.database().ref('contact-form/').on('child_added', ()=>audio.play())
    // firebase.database().ref('contact-form/').on('child_removed', ()=>remove.play())
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


                        <Typography
                            sx={{ m: 1, color: 'text.primary', }}
                            variant="h4"
                        >
                            All Users
                        </Typography>
                        <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">

                            <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                                        <TableRow>
                                            <TableCell align="left">
                                                Sr No.
                                            </TableCell>
                                            <TableCell align="left">
                                                Name
                                            </TableCell>
                                            <TableCell align="left">
                                                User Type
                                            </TableCell>
                                            <TableCell align="left">
                                                Phone No
                                            </TableCell>
                                            <TableCell align="left">
                                                Email
                                            </TableCell>
                                            <TableCell align="left">
                                                State
                                            </TableCell>
                                            <TableCell align="left">
                                                District
                                            </TableCell>
                                            <TableCell align='left'>
                                                Time Stamp
                                            </TableCell>
                                            <TableCell colSpan={2} align='left'>
                                                Operations
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item, index) => (
                                            <UserTR index={index} list={item} />

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

export default UserData
