import React, { useState } from 'react'
import ItemModal from '../item-modal';
import { Box, Paper, Table, TableCell, TableHead, TableRow, Typography, Button, TableBody } from '@mui/material'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';


const ItemTable = ({
    data = [],
    title,
    onSave = () => {},
    itemType,
    columns = [],
    btnTitle = "",
    modalInput = [],
    deleteItem = () => {},
    getItem = () => {},
    swalText = "",
    onEdit = () => {}
}) => {

    const Navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});


    const toggleModal = () => setShowModal(!showModal);



    const editItem = (item) => {
        setSelectedItem(item);
        toggleModal();
    };

    const onSaveHandler = (item, inputs, editingItem = false) => {
       // Check if any required field is empty
        const hasEmptyField = inputs.some(
            ({ key }) => !item[key]?.toString().trim()
        );

        if (hasEmptyField) {
            toast.error("Please fill all the fields", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }
        const updatedItems = {
            ...item,
            itemType
        }
        onSave(updatedItems, editingItem);
        toggleModal()
    }

    const deleteHandler = (item) => {
            Swal.fire({
                title: "Are you sure?",
                text: swalText,
                icon: "question",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteItem({
                        id: item._id
                    })
                    .then(async() => {
                        await getItem();
                            Swal.fire({
                            title: "Successfuly Deleted",
                            icon: "success"
                        })
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Something Went Wrong",
                            icon: "error"
                        })
                    })
                }
            })
    }



    return (
            <>
                {
                    showModal &&
                    <ItemModal
                        title={Object.keys(selectedItem).length ? "Edit Item" : "Add Item"}
                        open={showModal}
                        INPUT={columns}
                        onSave={onSaveHandler}
                        toggleModal={toggleModal}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                }
                <Box mt={2} mb={4} >
                            <Paper
                                elevation={8}
                                sx={(theme) => ({
                                    width: "100%",
                                    minHeight: "325px",
                                    backgroundColor: "#ffffff",
                                    p: 2,
                                    overflow: "auto",

                                })}
                            >
                                <Box mb={4} sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant='h6' color='black' >
                                            {title}
                                        </Typography>
                                        <Box
                                            sx={{
                                            display: "flex",
                                            gap: 1,
                                        }}
                                        >
                                            <Button
                                                size='small'
                                                className='outlinedCustomBtn'
                                                onClick={() => {
                                                    onEdit(itemType)
                                                }}
                                            >
                                                Edit Master Config
                                            </Button>
                                            <Button
                                                size='small'
                                                className='customBtn'
                                                onClick={() => {
                                                    setSelectedItem({})
                                                    toggleModal();
                                                }}
                                            >
                                                {btnTitle}
                                            </Button>

                                        </Box>
                                </Box>
                                    <Table size="small" sx={{ width: "100%" }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>S.No</TableCell>
                                                {
                                                    columns.map((column, index) => (
                                                        <TableCell  key={index} align='center'>
                                                            {column.title}
                                                        </TableCell>
                                                    ))
                                                }
                                                <TableCell align='center'>Action</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell key={index} align="center">
                                                            {index + 1}
                                                        </TableCell>
                                                        {columns.map((col, colIndex) => {
                                                            return (
                                                                <>

                                                                    <TableCell key={colIndex} align='center'>
                                                                        {item[col.key] || ""}
                                                                    </TableCell>
                                                                </>
                                                            );
                                                        })}
                                                        <TableCell align='center' key={index} sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                                            <EditOutlinedIcon sx={{cursor: "pointer"}} color="primary" onClick={() => editItem(item)} />
                                                            <DeleteOutlineOutlinedIcon   sx={{cursor: "pointer"}} color="error" onClick={() => deleteHandler(item)} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                            </Paper>
                </Box>
            </>
        )
}

export default ItemTable