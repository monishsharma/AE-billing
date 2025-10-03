import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import React from 'react';
import moment from 'moment';

export const tableConstants = ({ isCompanyAshok }) => {
  return [
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
            display: "flex",
            alignItems: "center"
          }}
        >
          {rowData.invoiceDetail.invoiceNO}
        </Typography>
      )
    },
  // ✅ conditional column wrapped in array
    ...(!isCompanyAshok ? [{
      field: 'Customer',
      headerName: 'Billed To',
      style: {
        minWidth: 200,
      },
      render: (rowData) => (
        <Typography variant="body2" color={"#000000"}>
          {rowData.buyerDetail.customer}
        </Typography>
      )
    }] : []),
    {
      field: 'date',
      headerName: 'Date',
      style: {
        minWidth: 150,
      },
      render: (rowData) =>
        `${moment(rowData.invoiceDetail.invoiceDate).format("ll")}`,
    },

    {
      field: 'Amount Due',
      headerName: 'Amount',
      style: {
        minWidth: 120,
      },
      render: (rowData) =>
        `${parseFloat(rowData.goodsDescription.Total).toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`,
    },
  ]
}
