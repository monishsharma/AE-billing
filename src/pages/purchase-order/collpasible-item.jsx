import { Box, Chip, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import DispatchDetail from './dispatch-detail'

const CollapsibleItem = ({
    isOpen,
    data,
    detailRef
}) => {

    const isPoForFrame = data.poType === "FRAME";

    return (
        <TableCell ref={detailRef} style={{ paddingBottom: 0, paddingTop: 0, background: "#ececec" }} colSpan={7}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h6"  >
                        Po Detail
                    </Typography>
                    <Table  size="small"  aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sno</TableCell>
                                <TableCell >Items</TableCell>
                                {
                                    isPoForFrame &&
                                    <TableCell  align='center'>Work Order</TableCell>
                                }
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
                        !!(data.dispatchedInvoices.length) && <DispatchDetail data={data} />
                    }
                </Box>
            </Collapse>
        </TableCell>
    )
}

export default CollapsibleItem;