import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { capitalize } from "../../helpers/capitalize";

const RollerBreakdown = ({ data = [], reportType }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                height: "350px",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                mb: 4
            }}
        >
            <Typography fontSize={16} fontWeight={700} mb={1.5}>
                Roller Dispatch Breakdown ({capitalize(reportType)})
            </Typography>

            <Box
                sx={{
                    maxHeight: 300,
                    overflowY: "auto",
                    pr: 0.5,
                    mt: 4
                }}
            >
                <Stack spacing={5}>
                    {data.map((customer) => (
                        <Box
                            key={customer.customerId}
                            sx={{
                                p: 1.4,
                                borderRadius: "12px",
                                bgcolor: "#FAFAFF",
                                border: "1px solid #EEEAFD",
                                borderLeft: "4px solid #6C5CE7",
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Typography fontSize={14} fontWeight={800}>
                                    {customer.customer}
                                </Typography>

                                <Stack direction="row" spacing={0.4} alignItems="baseline">
                                    <Typography fontSize={15} fontWeight={700}>
                                        {customer.totalQty}
                                    </Typography>
                                    <Typography fontSize={9} color="#64748B">
                                        NOS
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.8,
                                }}
                            >
                                {[...customer.rollers].sort((a, b) => Number(a.size) - Number(b.size))
                                    .map((roller) => (
                                        <Box
                                            key={`${roller.size}-${roller.sizeType}-${roller.edgeType}-${roller.rollerType}`}
                                            sx={{
                                                minWidth: 110,
                                                px: 1.1,
                                                py: 0.8,
                                                borderRadius: "8px",
                                                bgcolor: "#F3F0FF",
                                                border: "1px solid #E7E1FF",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                spacing={1.2}
                                            >
                                                <Box>
                                                    <Typography fontSize={11} fontWeight={700}>
                                                        {roller.size} {roller.sizeType}
                                                    </Typography>

                                                    <Typography
                                                        fontSize={8}
                                                        fontWeight={700}
                                                        color="#6C5CE7"
                                                    >
                                                        {roller.edgeType}
                                                        {roller.rollerType === "TWIN" && " • TWIN"}
                                                    </Typography>
                                                </Box>

                                                <Typography fontSize={15} fontWeight={700}>
                                                    {roller.qty}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Paper>
    );
};

export default RollerBreakdown;