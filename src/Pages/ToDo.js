import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDataLayerValue } from '../DataLayer/DataLayer';
import Input from "../Components/UI/Input"
/* eslint-disable */
function ToDo() {
    const [{ to_do }] = useDataLayerValue()
    const [data, setData] = useState(to_do);
    const [isAdding, setIsAdding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    return (

        <>
            {isAdding &&
                <div className="backdrop">
                    <Box style={{
                        width: "70%",
                        background: "#0b0f19",

                    }}>
                        <Box style={{ padding: "20px 40px" }}>
                        <Input
                                fullWidth
                                className="mb-3"
                                name="shortDesc"
                                label="Task"
                                required
                            />
                            <Button  variant="contained" sx={{ mr: 2 }}>
                                Submit
                            </Button>
                            <Button onClick={() => { setIsAdding(false) }} color="error" variant="contained">
                                Cancle
                            </Button>
                        </Box>
                    </Box>

                </div>
            }
            {isUpdating &&
                <div className="backdrop">
                    <Box style={{
                        width: "70%",
                        background: "#0b0f19",

                    }}>
                        <Box style={{ padding: "20px 40px" }}>

                            <Input
                                fullWidth
                                name="shortDesc"
                                label="Task"
                                required
                                className="mb-3"
                            />
                            <Button variant="contained" sx={{ mr: 2 }}>
                                Submit
                            </Button>
                            <Button color="error" variant="contained" sx={{ mr: 2 }}>
                                Delete
                            </Button>
                            <Button onClick={() => { setIsUpdating(false) }} color="error" variant="contained">
                                Cancle
                            </Button>
                        </Box>
                    </Box>

                </div>
            }
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Typography
                    sx={{ m: 1, color: 'text.primary', }}
                    variant="h4"
                >
                    To-Do List
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                    <Button variant="contained" className='mx-2'>
                        Update
                    </Button>
                    <Button onClick={() => { setIsAdding(true) }} variant="contained">
                        <AddIcon />
                    </Button>
                </Box>
            </Box>

            {
                <DragDrop data={data} setIsUpdating={setIsUpdating} setSelectedVideo={setSelectedVideo} setData={setData} />
            }
        </>
    )
}

function DragDrop({ data, setData, setIsUpdating, setSelectedVideo }) {

    const [itemList, setItemList] = useState(data);
    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...data];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setItemList(updatedList);
        setData(updatedList)
    };
    const editItem = (item) => {
        setIsUpdating(true)
        setSelectedVideo({ id: item.id })
    }

    return (
        <div className="App">
            <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                    {(provided) => (
                        <div
                            className="list-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {itemList.map((item, index) => (
                                <Draggable key={item.task} draggableId={item.task} index={index}>
                                    {(provided) => (
                                        <div
                                            className="item-container"
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                        >
                                            <div className="d-flex justify-content-between">
                                                {item.imgUrl && <img className="img-fluid" src={item.imgUrl} alt="" />}
                                                <div className="d-flex align-items-center">
                                                    <h4 className="mx-4 mb-0">
                                                        {item.id}
                                                    </h4>
                                                    <p className='mb-0'>
                                                        {item.task}
                                                    </p>
                                                </div>
                                                <EditIcon style={{ cursor: "pointer", }} onClick={() => editItem(item)} />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ToDo