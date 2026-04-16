import { Box, Button, Chip, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import DispatchDetail from './dispatch-detail'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CollapsibleItem = ({
    isOpen,
    data,
    detailRef,
    deletePoHandler,
    getInvoiceListConnect
}) => {

    const isPoForFrame = data.poType === "FRAME";



    return (
        <TableCell ref={detailRef} style={{ paddingBottom: 0, paddingTop: 0, background: "#ececec" }} colSpan={7}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography variant="h6"  >
                            Po Detail
                        </Typography>
                        <Box gap={2} display={"flex"} mb={2}>
                            <Button
                                variant='contained'
                                size='small'
                            >
                                Fetch Dispatch Detail
                            </Button>
                            <Button
                                variant='contained'
                                size='small'
                                color='error'
                                startIcon={<DeleteOutlineOutlinedIcon />}
                                onClick={() => deletePoHandler(data._id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                    <Table  size="small"  aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sno</TableCell>
                                <TableCell >Items</TableCell>
                                {
                                    isPoForFrame &&
                                    <TableCell  align='center'>Work Order</TableCell>
                                }
                                <TableCell align='center'>Rate</TableCell>
                                <TableCell align='center'>Total Qty</TableCell>
                                <TableCell align='center'>Dispatched Qty</TableCell>
                                <TableCell align='center'>Qty Left</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {
                                data.items.map((item,itemIndex) => {
                                    return (
                                        <TableRow key={itemIndex}>
                                            <TableCell align='center'>{item.itemNo}</TableCell>
                                            <TableCell
                                                style={{
                                                    maxWidth: 200,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {item.description}
                                            </TableCell>
                                            {
                                                isPoForFrame &&
                                                <TableCell align='center'>{item.workOrder}</TableCell>
                                            }
                                            <TableCell align='center'>
                                                {
                                                    parseFloat(item.rate || 0).toLocaleString("en-IN", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell align='center'>{item.qty}</TableCell>
                                            <TableCell align='center'>{item.dispatchedQty}</TableCell>
                                            {/* <TableCell align='center'>{item.pendingQty}</TableCell> */}
                                            <TableCell align='center'>
                                                <Chip
                                                    label={item.pendingQty}
                                                    size="small"
                                                    sx={{
                                                        border: `1px solid ${parseInt(item.pendingQty) !== 0 ? "#ED6C02" : "#4caf50"}`,
                                                        background: parseInt(item.pendingQty) !== 0 ? "#ED6C02" : "#4caf50",
                                                        color: "white"
                                                    }}
                                                    className="status-chip"
                                                />
                                            </TableCell>

                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    {
                        !!(data.dispatchedInvoices.length) && <DispatchDetail getInvoiceListConnect={getInvoiceListConnect} data={data} />
                    }
                </Box>
            </Collapse>
        </TableCell>
    )
}

export default CollapsibleItem;