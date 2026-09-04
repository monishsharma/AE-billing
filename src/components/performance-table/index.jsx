import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { formatAmount } from "../../helpers/price-formatter";

const BreakdownTable = ({
  data = [],
  labelKey,
  valueKey,
}) => {
  const sortedData = [...data].sort(
    (a, b) =>
      Number(b[valueKey] || 0) - Number(a[valueKey] || 0)
  );

  const total = data.reduce(
    (sum, item) => sum + Number(item[valueKey] || 0),
    0
  );

  const maxValue = Math.max(
    ...data.map((item) => Number(item[valueKey] || 0)),
    0
  );

  return (
    <TableContainer
      sx={{
        flex: 1,
        width: "100%",
        overflowX: "auto",
      }}
    >
      <Table
        size="small"
        sx={{
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableBody>
          {sortedData.map((item, index) => {
            const value = Number(item[valueKey] || 0);

            const percentage =
              total > 0 ? (value / total) * 100 : 0;

            const progressPercentage =
              maxValue > 0 ? (value / maxValue) * 100 : 0;

            return (
              <TableRow
                key={`${item[labelKey]}-${index}`}
                sx={{
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                {/* Rank */}
                <TableCell
                  sx={{
                    width: 36,
                    px: 0.5,
                    py: 1,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "6px",
                      backgroundColor: "#F3EEFF",
                      color: "#6C5CE7",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Box>
                </TableCell>

                {/* Label */}
                <TableCell
                  sx={{
                    width: {
                      xs: "32%",
                      sm: "30%",
                      md: "28%",
                    },
                    px: 1,
                    py: 1,
                    borderBottom: "1px solid #F1F5F9",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    title={item[labelKey]}
                    sx={{
                      fontSize: {
                        xs: "11px",
                        sm: "12px",
                        md: "13px",
                      },
                      fontWeight: 600,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item[labelKey]}
                  </Typography>
                </TableCell>

                {/* Progress */}
                <TableCell
                  sx={{
                    width: {
                      xs: "25%",
                      sm: "30%",
                      md: "35%",
                    },
                    px: 1,
                    py: 1,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 5,
                      borderRadius: 10,
                      backgroundColor: "#F1F5F9",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${progressPercentage}%`,
                        height: "100%",
                        backgroundColor: "#6C5CE7",
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                </TableCell>

                {/* Amount */}
                <TableCell
                  align="right"
                  sx={{
                    width: {
                      xs: 85,
                      sm: 100,
                      md: 110,
                    },
                    px: 1,
                    py: 1,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "11px",
                        sm: "12px",
                        md: "13px",
                      },
                      fontWeight: 800,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹ {formatAmount(value)}
                  </Typography>
                </TableCell>

                {/* Percentage */}
                <TableCell
                  align="right"
                  sx={{
                    width: {
                      xs: 48,
                      sm: 55,
                    },
                    px: 0.5,
                    py: 1,
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "10px",
                        sm: "11px",
                        md: "12px",
                      },
                      fontWeight: 700,
                      color: "#64748B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {percentage.toFixed(1)}%
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BreakdownTable;