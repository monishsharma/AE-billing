import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { capitalize } from "../../helpers/capitalize";
import { DASHBOARD_TAB_TYPE } from "../../constants/app-constant";
import YearlyRollerBreakdown from "./yearly";

const RollerBreakdown = ({ data = [], reportType, apiDataKey, isLoading }) => {
    return <YearlyRollerBreakdown data={data} reportType={reportType} />
};

export default RollerBreakdown;