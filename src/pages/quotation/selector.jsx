// columns.js
import React from "react";
import { IconButton, Chip, Checkbox, Typography, Button, Tooltip, Zoom } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from '@mui/icons-material/Receipt';
import moment from "moment";
import { CG_URL, COMPANY_TYPE } from "../../constants/app-constant";


export const getColumns = ({ handleDownload, value }) => {
  const isCompanyAshok = value === COMPANY_TYPE.ASHOK;
  return [
  {
    field: "Bill",
    renderHeader: () => (
      <strong>
        Quotation
      </strong>
    ),
    sortable: false,
    renderCell: (params) => {
      return (
        (
            <Button
              color="primary"
              className="customBtn"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(e, params.row);
              }}
              size="small"
            >
              Print
            </Button>
        )
      )
    },
  },
  {
    field: "quotationNo",
    width: 150,
    renderHeader: () => (
      <strong>
        Quotation No
      </strong>
    ),
    sortable: true,
    valueGetter: (params, row) => row?.quotationDetail?.quotationNo ?? "",
    renderCell: (params) => {
        return (
            <Typography
                variant="body2"
                color={moment(params?.row?.quotationDetail.invoiceDate).isSame(moment(), 'day') ? "secondary" : "black"}
                sx={{
                    height: "100%",
                    display:"flex",
                    alignItems: "center"
                }}
            >
                {params?.row?.quotationDetail.quotationNo}
            </Typography>
        )
    }
  },
  {
    field: "Description",
    width: 400,
    renderHeader: () => (
      <strong>
        Description
      </strong>
    ),
    sortable: false,
    renderCell: (params) => {
      const text = params?.row?.goodsDescription?.items?.[0]?.description || "-";
      const getTitle = () => {
        const allText = params?.row?.goodsDescription?.items
          ?.map((item) => ` ${item.description}, ₹ ${parseFloat(item.rate || 0).toFixed(2)}`)
          .join("\n");
        return allText || "-";
      }
      return (
        <Tooltip
          title={getTitle()}
          arrow
          slots={{
          transition: Zoom,
        }}
          componentsProps={{
          tooltip: {
            sx: {
              whiteSpace: "pre-line",
            },
          },
        }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {text}
          </span>
        </Tooltip>
      );
    },
  },
  {
    field: "customerName",
    flex: 1,
    renderHeader: () => (
      <strong>
        Company
      </strong>
    ),
    sortable: false,
    valueGetter: (params, row) => row?.buyerDetail?.customerName ?? "",
  },
  {
    field: "date",
    flex: 1,
    renderHeader: () => (
      <strong>
        Date
      </strong>
    ),
    sortable: true,

  sortComparator: (v1, v2) => {
    const d1 = moment(v1, "ll", true);
    const d2 = moment(v2, "ll", true);

    if (!d1.isValid() && !d2.isValid()) return 0;
    if (!d1.isValid()) return -1;
    if (!d2.isValid()) return 1;

    return d1.valueOf() - d2.valueOf(); // ascending order
  },
    valueGetter: (params, row) =>
      row?.quotationDetail?.quotationDate
        ? moment(row.quotationDetail.quotationDate).format("ll")
        : "-",
  },
  // {
  //   field: "rate",
  //   flex: 1,
  //   renderHeader: () => (
  //     <strong>
  //       Rate
  //     </strong>
  //   ),
  //   sortable: true,
  //   valueGetter: (params, row) =>
  //     parseFloat(row?.cost || 0).toLocaleString("en-IN", {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 2,
  //     }),
  // },
  // Example action column for marking paid:
]
};
