import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import React from 'react';
import moment from 'moment';

export const tableConstants = () => {
  return (
    [
        {
            field: 'Invoice No',
            headerName: 'Invoice No',
            style: {
                minWidth: 125,
            },
            render: (rowData) => (
                <Typography
                    variant="body2"
                    color={"red"}
                    sx={{
                        height: "100%",
                        display:"flex",
                        alignItems: "center"
                    }}
                >
                    {rowData.invoiceDetail.invoiceNO}
                </Typography>
            )
        },
        {
            field: 'date',
            headerName: 'Date',
            style: {
                minWidth: 125,
            },
            render: (rowData) => `${moment(rowData.invoiceDetail.invoiceDate).format("LL")}`,
        },
        {
            field: 'Amount Due',
            headerName: 'Amount',
            style: {
                minWidth: 120,
            },
            render: (rowData) => `${parseFloat(rowData.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
    ]
  )
}
