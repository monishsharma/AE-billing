import React from "react";
import { getAreaChartOption } from "./constant";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Paper, Typography } from "@mui/material";
import AreaChartSkeleton from "./area-chart-skeleton";
import { capitalize } from "../../helpers/capitalize";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const AreaChart = ({ data, isLoading, reportType, dateValue, financialYear }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                height: 350,
                boxSizing: "border-box",
            }}
        >
            <Typography fontWeight={800} mb={2}>
                Sales Trend {`(${capitalize(reportType)})`} {`- ${financialYear}`}
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    minHeight: 275,
                    position: "relative",
                }}
            >
                {isLoading ? (
                    <AreaChartSkeleton />
                ) : (
                    <Line
                        key="sales"
                        options={getAreaChartOption(reportType, dateValue)}
                        data={data}
                    />
                )}
            </Box>
        </Paper>
    );
};

export default AreaChart;