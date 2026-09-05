import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { GLOBAL_FLEX_STYLING } from "../../constants/app-constant";
import { TABLE_CELL_STYLE, TABLE_STYLE } from "./constant";

import moment from "moment";
import { downloadFile } from "../../helpers/file-downloader";
import Swal from "sweetalert2";

const UnpaidInvoices = ({
  company,
  isLoading,
  apiDataKey,
  dateValue,
  unpaidInvoices,
  generateCSVConnect,
}) => {
  const unpaidInvoicesCount =
    unpaidInvoices?.[apiDataKey]?.length || 0;

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const isValidCustomerValue = (value) => {
    if (typeof value !== "string") return false;

    const val = value.trim();

    if (!val) return false;

    // Pure number
    if (/^\d+$/.test(val)) return false;

    // Hex/alphanumeric database ID
    if (/^[a-f0-9]+$/i.test(val)) return false;

    return true;
  };

  const getCustomerName = (buyerDetail = {}) => {
    if (isValidCustomerValue(buyerDetail.customerName)) {
      return buyerDetail.customerName.trim();
    }

    if (isValidCustomerValue(buyerDetail.customer)) {
      return buyerDetail.customer.trim();
    }

    return typeof buyerDetail.name === "string"
      ? buyerDetail.name.trim()
      : "";
  };

  const exportCSV = () => {
    setIsBtnLoading(true);

    generateCSVConnect({
      company,
      month: dateValue.getMonth() + 1,
      year: dateValue.getFullYear(),
      forUnpaid: true,
      unpaidInvoicesList: unpaidInvoices?.[apiDataKey] || [],
    })
      .then((response) => {
        downloadFile(response);
        setIsBtnLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setIsBtnLoading(false);

        Swal.fire({
          icon: "error",
          text: "Failed to generate CSV",
        });
      });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid #E2E8F0",
        borderRadius: "14px",
        height: 350,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          ...GLOBAL_FLEX_STYLING,
          flexDirection: {
            xs: "row",
            sm: "row",
            md: "row",
          },
          mb: 1.5,
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            Unpaid Invoices
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#475569",
              mt: 0.2,
            }}
          >
            {unpaidInvoicesCount} outstanding
          </Typography>
        </Box>

        {!!unpaidInvoicesCount && (
          <Button
            loading={isBtnLoading || isLoading}
            size="small"
            onClick={exportCSV}
            variant="outlined"
            className="outlinedCustomBtn"
            sx={{
              textTransform: "none",
              minWidth: 68,
              borderColor: "#E2E8F0",
              color: "#475569",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            <span
              style={{
                visibility: isBtnLoading ? "hidden" : "visible",
                fontWeight: "bold",
              }}
            >
              Export
            </span>
          </Button>
        )}
      </Box>

      {/* Loading */}
      {isLoading ? (
        <Box sx={{ mt: 1 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={20}
              sx={{
                mb: 0.8,
                borderRadius: "6px",
              }}
            />
          ))}
        </Box>
      ) : unpaidInvoicesCount === 0 ? (
        /* Empty State */
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pb: 2,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#F0FDF4",
              mb: 1.2,
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 28,
                color: "#22C55E",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#0F172A",
            }}
          >
            All caught up!
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#94A3B8",
              mt: 0.4,
            }}
          >
            No unpaid invoices for this period.
          </Typography>
        </Box>
      ) : (
        /* Table */
        <TableContainer
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Table
            stickyHeader
            size="small"
            sx={{
              tableLayout: "fixed",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "24%",
                    ...TABLE_STYLE,
                  }}
                >
                  Invoice
                </TableCell>

                <TableCell
                  sx={{
                    width: "32%",
                    ...TABLE_STYLE,
                  }}
                >
                  Customer
                </TableCell>

                <TableCell
                  sx={{
                    width: "22%",
                    ...TABLE_STYLE,
                  }}
                >
                  Date
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    width: "22%",
                    ...TABLE_STYLE,
                  }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {unpaidInvoices?.[apiDataKey]?.map((invoice) => (
                <TableRow
                  key={invoice._id}
                  hover
                  sx={{
                    transition: "background-color 0.15s ease",

                    "&:hover": {
                      backgroundColor: "#F8FAFC",
                    },

                    "&:last-child td": {
                      borderBottom: 0,
                    },

                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    sx={{
                      ...TABLE_CELL_STYLE,
                      fontWeight: 700,
                      color: "#6C5CE7",
                    }}
                  >
                    {invoice.invoiceDetail.invoiceNO}
                  </TableCell>

                  <TableCell
                    sx={{
                      ...TABLE_CELL_STYLE,
                      fontWeight: 600,
                    }}
                  >
                    {getCustomerName(invoice.buyerDetail)}
                  </TableCell>

                  <TableCell
                    sx={{
                      ...TABLE_CELL_STYLE,
                      fontWeight: 600,
                    }}
                  >
                    {moment(
                      invoice.invoiceDetail.invoiceDate
                    ).format("ll")}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      ...TABLE_CELL_STYLE,
                      fontWeight: 800,
                      color: "#DC2626",
                    }}
                  >
                    {`₹${parseFloat(
                      invoice.goodsDescription.Total
                    ).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default UnpaidInvoices;