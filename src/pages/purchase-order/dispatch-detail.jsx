import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import moment from 'moment';
import { Link } from "@mui/material";
import React from 'react'
import { calculateDispatchedItemQty } from './selector';

const DispatchDetail = ({
    data
}) => {


    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h6"  >
                Dispatch Detail
            </Typography>
            <Table  size="small"  aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Sno</TableCell>
                        <TableCell >Invoice No</TableCell>
                        <TableCell align='center'>Invoice Date</TableCell>
                        <TableCell align='center'>Dispatched Qty</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {
                        data?.dispatchedInvoices?.map((item,itemIndex) => {
                            return (
                                <TableRow key={itemIndex}>
                                    <TableCell align='center'>{itemIndex + 1}</TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/edit/invoice/${item.invoiceId}`}
                                            target="_blank"
                                            rel="noopener"
                                            underline="hover"
                                        >
                                            {item.invoiceNo}
                                        </Link>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {moment(item.invoiceDate).format("ll")}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {calculateDispatchedItemQty({poItems: data.items, dispatchedItems:item.items })}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Box>
    )
}

export default DispatchDetail