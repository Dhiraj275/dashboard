import CheckBoxIcon from '@mui/icons-material/CheckBox';
import GroupIcon from '@mui/icons-material/Group';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CommonBlock from '../Components/Dashboard/CommonBlock';
import Graphs from '../Components/Dashboard/Graphs';
import RegistedUser from '../Components/Dashboard/registedUser';
import { TrafficByDevice } from '../Components/Dashboard/traffic';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import { useDataLayerValue } from '../DataLayer/DataLayer';
/* eslint-disable */
function Dashboard() {
    const [{ itemToVerify, videos, users, placed_orders }] = useDataLayerValue()

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
                className="main-display edit-categories">
                <div className="main-child">
                    <SecondMenu title="Manage crops and items" url="/manage-crops-and-item" />
                    <div id="signInBtn"></div>
                    <Box sx={{ pb: 20 }} className="container smart-card">
                        <Typography
                            sx={{ m: 1, color: 'text.primary', }}
                            variant="h4"
                        >
                            Overview
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <CommonBlock
                                title="Total Placed Order"
                                data={placed_orders.length}
                                Icon={CheckBoxIcon}
                                bgColor="error.main"
                            />
                            <CommonBlock
                                title="Listed Products"
                                data={videos.length}
                                Icon={ViewListIcon}
                                bgColor="secondary.main"
                            />
                            <CommonBlock
                                title="Total Users"
                                data={users.length}
                                Icon={GroupIcon}
                                bgColor="info.main"
                            />
                            {/* <Grid item lg={8}
                                sm={6}
                                xl={3}
                                xs={12}>

                                <Box sx={{
                                    widht: "100%",
                                    backgroundColor: "neutral.700",
                                    px: 3,
                                    py: 2,
                                    my: 3,
                                    borderRadius: 1
                                }}>
                                    {
                                        users.length ? <Graphs /> : <h4>Loading</h4>
                                    }
                                </Box>
                                <Box sx={{
                                    widht: "100%",
                                    backgroundColor: "neutral.700",
                                    px: 3,
                                    py: 2,
                                    borderRadius: 1
                                }}>
                                    <Dhiraj />
                                </Box>
                            </Grid>
                            <Grid item
                                lg={4}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <Box>
                                    <TrafficByDevice sx={{ height: '100%', backgroundColor: "neutral.700" }} />
                                </Box>
                            </Grid> */}
                        </Grid>
                    </Box>

                </div>
            </Box >
        </>
    )
}

export default Dashboard