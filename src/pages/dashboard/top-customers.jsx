import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { GLOBAL_FLEX_STYLING } from '../../constants/app-constant'
import { capitalize } from '../../helpers/capitalize'
import BreakdownTable from '../../components/performance-table'

const TopCustomers = ({
    title,
    reportType,
    ...props
}) => {
    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    height: "350px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >

                <Box
                    sx={{
                        ...GLOBAL_FLEX_STYLING,
                        flexDirection: {
                            xs: "row",
                            sm: "row",
                            md: "row"
                        },
                        mb: 1.5,
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
                            {title}
                            {` (${capitalize(reportType)})`}
                        </Typography>

                    </Box>

                </Box>
                <BreakdownTable {...props} />
            </Paper>
        </>
    )
}

export default TopCustomers