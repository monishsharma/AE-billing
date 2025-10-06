// columns.js
import React from "react";
import { IconButton, Chip, Checkbox, Typography } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";

export const getColumns = ({ handleDownload, chekboxhandler }) => [
  {
    field: "",
    width: 10,
    sortable: false,
    scrollbarsize: false,
    renderCell: (params) => (
      <Checkbox
        id=""
        checked={params.row.paid}
        onClick={(e) => chekboxhandler(e, params.row)}
      />
    ),
  },
  {
    field: "Bill",
    renderHeader: () => (
      <strong>
        Bill
      </strong>
    ),
    sortable: false,
    minWidth: 100,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(e, params.row);
          }}
          size="small"
        >
          <FileCopyIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(e, params.row, true);
          }}
          size="small"
        >
          <DownloadIcon />
        </IconButton>
      </>
    ),
  },
  {
    field: "invoiceNo",
    renderHeader: () => (
      <strong>
        Invoice No
      </strong>
    ),
    sortable: true,
    minWidth: 125,
    valueGetter: (params, row) => row?.invoiceDetail?.invoiceNO ?? "",
    renderCell: (params) => {
        return (
            <Typography
                variant="body2"
                color={moment(params?.row?.invoiceDetail.invoiceDate).isSame(moment(), 'day') ? "secondary" : "black"}
                sx={{
                    height: "100%",
                    display:"flex",
                    alignItems: "center"
                }}
            >
                {params?.row?.invoiceDetail.invoiceNO}
            </Typography>
        )
    }
  },
  {
    field: "Description",
    renderHeader: () => (
      <strong>
        Description
      </strong>
    ),
    minWidth: 250,
    sortable: false,
    renderCell: (params) => {
      const text = params?.row?.goodsDescription?.items?.[0]?.description || "-";
      const geTitle = () => {
        const allText = params?.row?.goodsDescription?.items
          ?.map((item) => `${item.description} - ${item.wo}`)
          .join(", ");
        return allText || "-";
      }
      return (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={geTitle()}
        >
          {text}
        </div>
      );
    },
  },
  {
    field: "Billed To",
    renderHeader: () => (
      <strong>
        Billed To
      </strong>
    ),
    minWidth: 150,
    sortable: false,
    valueGetter: (params, row) => `${row?.buyerDetail.customer}`,
  },
  {
    field: "P.O. No",
    renderHeader: () => (
      <strong>
        PO
      </strong>
    ),
    sortable: false,
    minWidth: 150,
    valueGetter: (params, row) => `${row?.goodsDescription.po}`,
  },
  {
    field: "date",
    renderHeader: () => (
      <strong>
        Date
      </strong>
    ),
    sortable: true,
    minWidth: 120,

  sortComparator: (v1, v2) => {
    const d1 = moment(v1, "ll", true);
    const d2 = moment(v2, "ll", true);

    if (!d1.isValid() && !d2.isValid()) return 0;
    if (!d1.isValid()) return -1;
    if (!d2.isValid()) return 1;

    return d1.valueOf() - d2.valueOf(); // ascending order
  },
    valueGetter: (params, row) =>
      row?.invoiceDetail?.invoiceDate
        ? moment(row.invoiceDetail.invoiceDate).format("ll")
        : "-",
  },
  {
    field: "status",
    minWidth: 120,
    sortable: false,
    renderHeader: () => (
      <strong>
        Status
      </strong>
    ),
    renderCell: (params, row) => (
      <Chip
        label={row?.paid ? "Paid" : "Unpaid"}
        size="small"
        variant="outlined"
        color={row?.paid ? "primary" : "error"}
      />
    ),
  },
  {
    field: "Amount",
    renderHeader: () => (
      <strong>
        Amount
      </strong>
    ),
    sortable: true,
    flex: 1,
    minWidth: 120,
    valueGetter: (params, row) =>
      parseFloat(row?.goodsDescription?.Total || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  // Example action column for marking paid:
];
