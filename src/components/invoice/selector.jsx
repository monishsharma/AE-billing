// columns.js
import React from "react";
import { IconButton, Chip, Checkbox, Typography, Button } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from '@mui/icons-material/Receipt';
import moment from "moment";
import { CG_URL, COMPANY_TYPE } from "../../constants/app-constant";


export const getColumns = ({ handleDownload, chekboxhandler, value }) => {
  const isCompanyAshok = value === COMPANY_TYPE.ASHOK;
  return [
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
    width: 90,
    renderCell: (params) => {
      return (
        (
          <>
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(e, params.row);
              }}
              size="small"
            >
              <FileCopyIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(e, params.row, true

                );
              }}
              size="small"
            >
              <ReceiptIcon />
            </IconButton>
          </>
        )
      )
    },
  },
  ...(isCompanyAshok ? [
    {
      field: "ASN",
      renderHeader: () => {
        return <strong>ASN</strong>;
      },
      sortable: false,
      width: 60,
      renderCell: (params) => {
        const asnNumber = params?.row?.shippingDetail.asn || "";
        return (
          asnNumber && <IconButton color="secondary" aria-label="add an alarm" onClick={(e) => {
                e.stopPropagation();
                window.open(`${CG_URL}${asnNumber}`, '_blank')
              }}>
            <DownloadIcon />
          </IconButton>
        );
      },

    },

  ] : []),
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
  ...(!isCompanyAshok ? [
  {
    field: "Billed To",
    renderHeader: () => <strong>Billed To</strong>,
    minWidth: 150,
    sortable: false,
    valueGetter: (params, row) => `${row?.buyerDetail.customer}`,
  }
] : []),
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
    minWidth: 100,
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
]
};
