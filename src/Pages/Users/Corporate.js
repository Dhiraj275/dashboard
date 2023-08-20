import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import SecondMenu from '../../Components/SecondMenu';
import SlideMenu from '../../Components/SlideMenu';
import firebase from '../../firebase';
/* eslint-disable */
function Corporate() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = () => {
      async function getData() {
        firebase.database().ref('users/').on('value', (snapshot) => {
          const rawUserData = []
          var snapVal = snapshot.val();
          for (let id in snapVal) {
            if (snapVal[id].userType === "corporate") {
              rawUserData.push({ ...snapVal[id], id: id })
            }
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
                Corporates
              </Typography>

              <Box sx={{ color: 'text.primary', pb: 10, mt: 3, }} className="table-responsive">
                <TableContainer sx={{ minWidth: 650, backgroundColor: "#111827" }} component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#1f2937" }}>
                      <TableRow>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Phone No.</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>District</TableCell>
                        <TableCell sx={{ minWidth: "200px" }}>Address</TableCell>
                        <TableCell sx={{ minWidth: "200px" }}>Time Stamp</TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Company Type</TableCell>
                        <TableCell>Contact Person Email</TableCell>
                        <TableCell>Contact Person Name</TableCell>
                        <TableCell>Contact Person Phone</TableCell>
                        <TableCell>Company Address</TableCell>
                        <TableCell>Storage</TableCell>
                        <TableCell colSpan={2} className="text-center">Opration</TableCell>
                      </TableRow>
                    </TableHead>
                    <tbody>

                      {

                        data.map((list, index) => {
                          console.log(list)
                          return (
                            <UserTR index={index} list={list} />
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </TableContainer>
              </Box>
            </div>

          </div>
        </Box>
      </>

    </>
  )
}

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
    <TableRow key={props.index}>
      <TableCell>{props.index + 1}</TableCell>
      <TableCell>{list.name}</TableCell>
      <TableCell>{list.userType}</TableCell>
      <TableCell>{list.phone}</TableCell>
      <TableCell>{list.email}</TableCell>
      <TableCell>{list.state}</TableCell>
      <TableCell>{list.district}</TableCell>
      <TableCell>{list.address}</TableCell>
      <TableCell>{timestamp}</TableCell>
      {
        list.corporateData ?
          <>
            <TableCell>{list.corporateData.name}</TableCell>
            <TableCell>{list.corporateData.company_type}</TableCell>
            <TableCell>{list.corporateData.contact_person_email}</TableCell>
            <TableCell>{list.corporateData.contact_person_name}</TableCell>
            <TableCell>{list.corporateData.contact_person_phone}</TableCell>
            <TableCell>{list.corporateData.address}</TableCell>
            <TableCell>{list.corporateData.storage}</TableCell>
          </>
          :
          <>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </>

      }
      <TableCell className="text-center">
        <i onClick={deleteItem} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-trash text-danger"></i>
      </TableCell>
      <TableCell className="text-center">
        <i onClick={showDetail} style={{ cursor: 'pointer', margin: '0 5px' }} className="fa fa-info-circle text-primary" aria-hidden="true"></i>
      </TableCell>
    </TableRow>
  )
}

export default Corporate