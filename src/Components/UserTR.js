import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import firebase from '../firebase';
/* eslint-disable */
function UserTR(props) {
    const list = props.list
    const deleteItem = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then(() => {

            firebase.database().ref("orders").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].userId === list.userId) {
                        firebase.database().ref("orders").child(id).remove()
                    }
                }
            })
            firebase.database().ref("items").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].sellerUID === list.userId) {
                        firebase.database().ref("items").child(id).remove()
                    }
                }
            })
            firebase.database().ref("item-to-verify").on("value", (snap) => {
                var snapVal = snap.val()
                for (let id in snapVal) {
                    if (snapVal[id].sellerUID === list.userId) {
                        firebase.database().ref("item-to-verify").child(id).remove()
                    }
                }
            })
            const item = firebase.database().ref('users/').child(list.userId)
            item.remove()

        })

    }
    const showDetail = () => {
        delete list.farmerData
        delete list.product_for_sell
        delete list.item_rejected
        delete list.cart
        delete list.orders
        delete list.corporateData




        const theDetial = () => {
            var detail = ""
            Object.keys(list).map((col) => { detail = detail + `${col}: ${list[col]} <br>` })
            return detail
        }

        Swal.fire("The detail", `<div className="text-left">${theDetial()}</div>`, "info")
        console.log(list)

    }
    var timestamp = list.timeStamp
    var rawTime = String(new Date(timestamp))
    var timestamp = ""
    if (rawTime === "Invalid Date") {
        timestamp = ""
    }
    else {
        timestamp = rawTime.replace("GMT+0530 (India Standard Time)", "")
    }
    return (
        <TableRow
            key={list.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{props.index + 1}</TableCell>
            <TableCell align="left">{list.name}</TableCell>
            <TableCell align="left">{list.userType}</TableCell>
            <TableCell align="left">{list.phone}</TableCell>
            <TableCell align="left">{list.email}</TableCell>
            <TableCell align="left">{list.state}</TableCell>
            <TableCell align="left">{list.district}</TableCell>
            <TableCell align="left">{timestamp}</TableCell>
            <TableCell className="text-center">
                <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
            </TableCell>
            <TableCell className="text-center">
                <i onClick={showDetail} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-info-circle text-primary" aria-hidden="true"></i>
            </TableCell>
        </TableRow>
    )
}

export default UserTR
