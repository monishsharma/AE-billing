import React, { useState } from 'react'
import ItemModal from '../item-modal';
import { Box, Paper, Table, TableCell, TableHead, TableRow, Typography, Button, TableBody } from '@mui/material'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';



const ItemTable = ({
    data,
    title,
    onSave,
    columns = [],
    btnTitle,
    modalInput,
    deleteItem,
    getItem,
    swalText
}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});


    const toggleModal = () => setShowModal(!showModal);



    const editItem = (item) => {
        setSelectedItem(item);
        toggleModal();
    };

    const onSaveHandler = (item) => {
        if (!item.label || !item.desc) {
           toast.error("Please fill all the fields", {
            position: "top-right",
            autoClose: 2000,
           });
           return;
        }
        onSave(item);
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
                        hsnId: item._id
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
                        title={selectedItem?._id ? "Edit Item" : "Add Item"}
                        open={showModal}
                        INPUT={modalInput}
                        onSave={onSaveHandler}
                        toggleModal={toggleModal}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                }
                <Box mt={4}>
                            <Paper
                                sx={(theme) => ({
                                    backgroundColor: '#fff',
                                    ...theme.typography.body2,
                                    p: 2,
                                    maxHeight: "auto",
                                    overflow: "auto",
                                    // textAlign: 'center',
                                    color: (theme.vars ?? theme).palette.text.secondary,
                                    ...(theme.palette.mode === 'dark' && {
                                    backgroundColor: '#1A2027',
                                    }),
                                })}
                            >
                                <Box mb={2}>
                                        <Typography variant='h6' color='black' mb={2}>
                                            {title}
                                        </Typography>
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
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    columns.map((column, index) => (
                                                        <TableCell sx={{minWidth: "100px"}} key={index} align='center'>
                                                            {column.field}
                                                        </TableCell>
                                                    ))
                                                }

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data.map((item, index) => (
                                                    <TableRow key={item._id || index}>
                                                        {columns.map((col, colIndex) => {

                                                            // handle special columns
                                                            if (col.key === "sno") {
                                                                return (
                                                                    <TableCell sx={{width: "fit-content"}} key={colIndex} align="center">
                                                                        {index + 1}
                                                                    </TableCell>
                                                                );
                                                            }

                                                            if (col.key === "action") {
                                                                return (
                                                                    <TableCell align='center' key={colIndex} sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                                        <Button size="small" onClick={() => editItem(item)}>Edit</Button>
                                                                        <Button size="small" color="error" onClick={() => deleteHandler(item)}>Delete</Button>
                                                                    </TableCell>
                                                                );
                                                            }

                                                            // normal fields
                                                            return (
                                                                <TableCell key={colIndex} align='center'>
                                                                    {item[col.key] || ""}
                                                                </TableCell>
                                                            );
                                                        })}
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