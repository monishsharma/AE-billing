// columns.js
import React from "react";
import { IconButton, Chip, Checkbox, Typography, Button, Tooltip, Zoom } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from '@mui/icons-material/Receipt';
import moment from "moment";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { CG_URL, COMPANY_TYPE } from "../../constants/app-constant";


export const getColumns = ({ toggleRow,expandedRow, chekboxhandler, value }) => {
    return [
         {
            field: "expand",
            headerName: "",
            width: 60,
            sortable: false,
            renderCell: (params) => (
            <span onClick={(e) => {
                e.stopPropagation();
                toggleRow(params.row._id);
            }}>
                {expandedRow === params.row._id ? "▼" : "▶"}
            </span>
            )
        },

        {
            field: "P.O. No",
            renderHeader: () => (
                <strong>
                    PO
                </strong>
            ),
            sortable: false,
            flex: 1,
            valueGetter: (params, row) => `${row?.poNumber}`,
        },

        {
            field: "Customer",
            flex: 1,
            renderHeader: () => (
                <strong>
                    Customer
                </strong>
            ),
            sortable: false,
            scrollbarsize: false,
            renderCell: (params) => {
                return (
                    <Typography
                        sx={{
                            display: "flex",
                            height: "100%",
                            alignItems: "center"
                        }}
                    >
                        {params?.row?.vendorDetail?.branchLabel}
                    </Typography>
                )
            }
        },
        {
            field: "date",
            renderHeader: () => (
              <strong>
                PO Date
              </strong>
            ),
            sortable: true,
            flex: 1,
            valueGetter: (params, row) => moment(row.poDate).format("ll")
          },

        {
            field: "status",
            flex: 1,
            sortable: false,
            renderHeader: () => <strong>Status</strong>,
            renderCell: (params) => {
                const isPending = params.row?.poStatus === "PENDING";
                return (
                    <div className="status-cell">
                        <Chip
                            label={isPending ? "Pending" : "Completed"}
                            size="small"
                            sx={{
                                border: `1px solid ${isPending ? "#ED6C02" : "#4caf50"}` ,
                                background: isPending ? "#ED6C02" : "#4caf50" ,
                                color: "white"
                            }}
                            className="status-chip"
                        />
                    </div>
                );
            },
        }

        // Example action column for marking paid:
    ]
};
