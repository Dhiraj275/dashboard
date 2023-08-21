import { Box } from '@mui/material';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '.';
import SecondMenu from '../Components/SecondMenu';
import SlideMenu from '../Components/SlideMenu';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import AddItem from './AddItems';
import ContactMails from './ContactMail';
import EditCategories from './EditCategories';
import Login from './Login';
import ManageItems from './ManageItems';
import Orders from './Orders';
import ToDo from './ToDo';
function AdminPanel() {
    const [{ drawer }, dispatch] = useDataLayerValue()
    return (
        <>
            <div
                className={`main`}
            >
                <SlideMenu title="Edit Catrgories" url="/edit-categories" />
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        display: "flex",
                        flex: 1,
                    }}
                    className="main-display edit-categories">
                    <div className="main-child">
                        <SecondMenu title="Manage crops and items" url="/manage-crops-and-item" />
                        <Box sx={{ pb: 20 }} className="container smart-card">
                            <Switch>
                                <Route exact path="/" component={DashBoard} />
                                <Route exact path="/add-item" component={AddItem} />
                                <Route exact path="/products/categories" component={EditCategories} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/products/all" component={ManageItems} />
                                <Route exact path="/mails" component={ContactMails} />
                                <Route exact path="/to-do" component={ToDo} />
                                <Route exact path="/orders" component={Orders} />
                            </Switch>
                        </Box>
                    </div>
                </Box>

            </div>
        </>
    )
}

export default AdminPanel
