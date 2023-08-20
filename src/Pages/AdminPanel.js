import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '.';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import firebase from '../firebase';
import AddItem from './AddItems';
import ContactMails from './ContactMail';
import EditCategories from './EditCategories';
import EditItemDetail from './EditItemDetail';
import Featured from './Featured';
import Login from './Login';
import ManageItems from './ManageItems';
import ReviewContent from './ReviewContent';
// import Login from './Login';
function AdminPanel() {
    const [{ drawer }, dispatch] = useDataLayerValue()
    useEffect(() => {
        const loadData = () => {


            firebase.database().ref('videos/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const itemsArry = [];

                for (let id in snapVal) {
                    itemsArry.push({ id, ...snapVal[id] })
                }
                dispatch({
                    type: "SET_VIDEOS",
                    data: itemsArry
                })
            })
            firebase.database().ref('categories/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                dispatch({
                    type: "SET_CATE_LIST",
                    data: fatched
                })
            })
            firebase.database().ref('brands/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                dispatch({
                    type: "SET_BRANDS",
                    data: fatched
                })
            })
            firebase.database().ref('placed_orders/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const fatched = [];

                for (let id in snapVal) {
                    fatched.push({ id, ...snapVal[id] })
                }
                dispatch({
                    type: "SET_PLACED_ORDERS",
                    data: fatched
                })
            })
            firebase.database().ref('users/').on('value', (snapshot) => {
                var snapVal = snapshot.val();
                const userdata = [];

                for (let id in snapVal) {
                    userdata.push({ id, ...snapVal[id] })
                }

                dispatch({
                    type: "SET_USERS",
                    data: userdata
                })
                var farmers = 0
                var consumers = 0
                var corporates = 0
                userdata.map((item) => {
                    var userType = item.userType

                    if (userType === "farmer") {
                        farmers += 1
                    }
                    if (userType === "consumer") {
                        consumers += 1
                    }
                    if (userType === "corporate") {
                        corporates += 1
                    }

                })
                dispatch({
                    type: "SET_LENGTHS",
                    data: { farmers, corporates, consumers }
                })
            })
        }
        loadData()
    }, [])
    return (
        <>
            <div
                className={`main`}
            >
                <Switch>
                    <Route exact path="/" component={DashBoard} />
                    <Route exact path="/add-item" component={AddItem} />
                    <Route exact path="/edit-item-detail" component={EditItemDetail} />
                    <Route exact path="/videos/categories" component={EditCategories} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/videos/all" component={ManageItems} />
                    <Route exact path="/mails" component={ContactMails} />
                    <Route exact path="/feature-videos" component={Featured} />
                    <Route exact path="/review-videos" component={ReviewContent} />
                </Switch>
            </div>
        </>
    )
}

export default AdminPanel
