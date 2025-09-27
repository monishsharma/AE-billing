import { Checkbox, Chip, IconButton, styled, Typography } from '@mui/material'
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import moment from 'moment';

export const tableConstants = ({
    chekboxhandler,
    handleDownload,
    getDuePayment
}) => {
  return (
    [
        {
            field: "",
            render: (rowData) => <Checkbox id="" checked={rowData.paid}   onClick={(e) => chekboxhandler(e,rowData)} />,
        },
        {
            field: 'Bill',
            headerName: 'Bill',
            style: {
                minWidth: 100,
            },
            render: (rowData) => (
                <>
                    <IconButton onClick={(e) => handleDownload(e, rowData)} size="small">
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDownload(e, rowData, true)} size="small">
                        <DownloadIcon />
                    </IconButton>
                </>
            )
        },
        {
            field: 'Invoice No',
            headerName: 'Invoice No',
            style: {
                minWidth: 150,
                flex: 1
            },
            // render: (rowData) => `${rowData.invoiceDetail.invoiceNO}`,
            render: (rowData) => (
                <Typography
                    variant="body2"
                    color={moment(rowData.invoiceDetail.invoiceDate).isSame(moment(), 'day') ? "secondary" : "black"}
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
            field: 'Description',
            headerName: 'Description',
            description: 'This column has a value getter and is not sortable.',
            style: {
                maxWidth: 250,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            render: (rowData) => {
                const text = rowData.goodsDescription.items[0].description || "-";
                return (
                  <div
                    style={{
                      maxWidth: 250,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={text} // 👈 native tooltip on hover
                  >
                    {text}
                  </div>
                );
              }
        },
        {
            field: 'Billed To',
            headerName: 'Billed To',
            style: {
                minWidth: 200,
            },
            render: (rowData) => `${rowData.buyerDetail.customer}`,
        },

        {
            field: 'date',
            headerName: 'Date',
            style: {
                minWidth: 175,
            },
            render: (rowData) => `${moment(rowData.invoiceDetail.invoiceDate).format("LL")}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            style:{
                minWidth: 100,
            },
            render: (rowData) => <Chip label={rowData.paid ? "Paid" : "Unpaid"} size="small" variant="outlined" color={rowData.paid ? "success" : "error"} />,
        },
        {
            field: 'Amount',
            headerName: 'Amount',
            style: {
                minWidth: 120,
            },
            render: (rowData) => `${parseFloat(rowData.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
    ]
  )
}
