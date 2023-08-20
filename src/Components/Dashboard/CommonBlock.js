import ViewListIcon from '@mui/icons-material/ViewList';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import React from 'react';

/* eslint-disable */
function CommonBlock({ title, Icon, data, bgColor }) {
    return (
        <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}

        >
            <Box sx={{
                widht: "100%",
                backgroundColor: "neutral.700",
                px: 3,
                py: 2,
                borderRadius: 1
            }}>
                <Grid container>
                    <Grid xs={6} item>
                        <Typography
                            color="neutral.600"
                            gutterBottom
                            variant="overline"
                        >
                            {title}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {data}
                        </Typography>
                    </Grid>
                    <Grid xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} item>
                        <Avatar
                            sx={{
                                backgroundColor: bgColor,
                                height: 56,
                                width: 56
                            }}
                        >
                            {
                                <Icon sx={{ color: "text.primary" }} />
                            }
                        </Avatar>

                    </Grid>
                </Grid>
            </Box>

        </Grid>
    )
}

export default CommonBlock