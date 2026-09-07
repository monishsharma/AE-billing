import {
    Box,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

import React, { useEffect, useState, useRef } from "react";
import { capitalize } from "../../helpers/capitalize"
import SelectVendor from "../select-vendor";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getFinancialYearMonthsTill } from "./selector";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const accordionSx = {
    border: "1px solid #E5E0FF",
    borderRadius: "10px !important",
    boxShadow: "none",
    overflow: "hidden",
    mb: 1,

    "&:before": {
        display: "none",
    },

    "&.Mui-expanded": {
        margin: "0 0 8px 0",
        borderColor: "#D9D0FF",
    },
};

const summarySx = {
    minHeight: 48,

    // Move expand icon to LEFT
    flexDirection: "row-reverse",

    "& .MuiAccordionSummary-expandIconWrapper": {
        marginRight: 1,
        marginLeft: 0,
    },

    "& .MuiAccordionSummary-content": {
        margin: "10px 0",
    },

    "&.Mui-expanded": {
        minHeight: 48,
        bgcolor: "#F3F0FF",
    },

    "& .MuiAccordionSummary-content.Mui-expanded": {
        margin: "10px 0",
    },
};

const YearlyRollerBreakdown = ({ reportType, data }) => {

    const currentMonth = new Date().getMonth() + 1;
    const fyMonth = getFinancialYearMonthsTill(currentMonth)

    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toLocaleString("en-US", { month: "short" })
    );
    const [expanded, setExpanded] = useState(null)
    const [selectedVendor, setSelectedVendor] = useState(null);


    const monthRefs = useRef({});
    const itemRefs = useRef({});
    const filteredDataByVendor = selectedVendor ? data?.filter((item) => item.customerId === selectedVendor.id) : data;

    useEffect(() => {
        if (itemRefs?.current && expanded !== null) {
            itemRefs.current[expanded].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            })
        }


    }, [expanded])

    const selectVendorCallback = (event, selectedVendorDetail) => {
        setSelectedVendor(selectedVendorDetail);
    }




    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                height: "350px",
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                mb: 4,
                overflowY: "auto",
            }}
        >
            <Box
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    mb: 1.5,
                }}
            >
                <Typography fontSize={16} fontWeight={700}>
                    Roller Dispatch Breakdown ({capitalize(reportType)})
                </Typography>

                <SelectVendor
                    size="small"
                    allowPreset={true}
                    callback={(event, selectedVendor) => selectVendorCallback(event, selectedVendor)}
                />
            </Box>
            {
                    !(filteredDataByVendor?.length) &&
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            pb: 2,
                            height: "80%",
                            overflow: "hidden"
                        }}
                    >
                        <Box
                            className="cancelRipple"
                        >
                            <CancelRoundedIcon
                                sx={{
                                    fontSize: 28,
                                    color: "#EF4444",
                                }}
                            />
                        </Box>


                        <Typography
                            sx={{
                                fontSize: "12px",
                                color: "#94A3B8",
                                mt: 0.4,
                                fontWeight: 600,

                            }}
                        >
                            No Dispatch Found.
                        </Typography>
                    </Box>
                }
            <Box>

                {
                    filteredDataByVendor?.map((item, index) => {

                        const selectedMonthData = item.monthly.find((mon) => {
                            const monthConfig = fyMonth.find(
                                (month) => month.label === selectedMonth
                            );

                            if (!monthConfig) return false;

                            const year = new Date().getFullYear();

                            return mon.month === `${year}-${monthConfig.key}`;
                        });

                        return (
                            <Accordion
                                sx={accordionSx}
                                key={item.customerId}
                                expanded={expanded === null ? index === 0 : expanded === index}
                                onChange={(_, isExpanded) => {
                                    setExpanded(isExpanded ? index : null);
                                }}

                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={summarySx}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            width: "100%",
                                        }}
                                        ref={(el) => {
                                            itemRefs.current[index] = el;
                                        }}
                                    >

                                        <Typography fontSize={13} fontWeight={700}>
                                            {item.customer}
                                        </Typography>

                                        <Box sx={{ flex: 1 }} />

                                        {/* <Typography fontSize={15} fontWeight={700}>
                                            {item.totalQty}
                                        </Typography> */}

                                        {/* <Typography fontSize={9} color="#64748B">
                                            NOS
                                        </Typography> */}
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails
                                    sx={{
                                        bgcolor: "#FFF",
                                        px: 1.5,
                                        pt: 1,
                                        pb: 0.8,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 0.7,
                                            overflowX: "auto",
                                            py: 0.5,

                                            "&::-webkit-scrollbar": {
                                                display: "none",
                                            },

                                            scrollbarWidth: "none",
                                        }}
                                    >
                                        {fyMonth.map((month) => {
                                            const active = selectedMonth === month.label;

                                            const getCount = (currentMonth) => {
                                                const key = `${new Date().getFullYear()}-${currentMonth.key}`;

                                                const found = item.monthly.find(
                                                    (mon) => mon.month === key
                                                );

                                                return found?.totalQty ?? 0;
                                            };



                                            return (
                                                <>

                                                    <Box
                                                        key={month.label}
                                                        onClick={() => setSelectedMonth(month.label)}
                                                        ref={(el) => {
                                                            monthRefs.current[month.label] = el;
                                                        }}
                                                        sx={{
                                                            minWidth: 52,
                                                            px: 0.8,
                                                            py: 0.6,
                                                            borderRadius: "8px",
                                                            cursor: "pointer",
                                                            textAlign: "center",
                                                            bgcolor: active ? "#6C5CE7" : "#F7F5FF",
                                                            border: active ? "1px solid #6C5CE7" : "1px solid #E5E0FF",
                                                            transition: "0.15s ease",
                                                        }}
                                                    >
                                                        <Typography
                                                            fontSize={10}
                                                            fontWeight={800}
                                                            color={active ? "#FFF" : "#000"}
                                                            textTransform="uppercase"
                                                        >
                                                            {/* {month.label} */}
                                                            {month.label}
                                                            <br />
                                                            {getCount(month)}
                                                        </Typography>

                                                    </Box>
                                                </>
                                            );
                                        })}

                                    </Box>
                                    {selectedMonthData ? (
                                        <Box sx={{ mt: 1 }}>
                                            {[...selectedMonthData.rollers]
                                                .sort((a, b) => Number(a.size) - Number(b.size))
                                                .map((roller) => (
                                                    <Box
                                                        key={`${roller.size}-${roller.sizeType}-${roller.edgeType}-${roller.rollerType}`}
                                                        sx={{
                                                            display: "grid",
                                                            gridTemplateColumns: "80px 90px 1fr 40px",
                                                            alignItems: "center",
                                                            minHeight: 28,
                                                            p: "0 20px",
                                                            borderBottom: "1px solid #F1F1F1",
                                                        }}
                                                    >
                                                        <Typography fontSize={10.5} fontWeight={700}>
                                                            {roller.size} {roller.sizeType}
                                                        </Typography>

                                                        <Typography fontSize={9.5}>
                                                            {roller.edgeType}
                                                        </Typography>

                                                        <Typography fontSize={9.5} color="#64748B">
                                                            {roller.rollerType === "TWIN" ? "Twin" : ""}
                                                        </Typography>

                                                        <Typography
                                                            fontSize={10.5}
                                                            fontWeight={700}
                                                            textAlign="right"
                                                        >
                                                            {roller.qty}
                                                            {" "}
                                                            <span style={{ fontSize: 9, fontWeight: 700, color: "#64748B" }}>NOS</span>
                                                        </Typography>

                                                    </Box>
                                                ))}
                                        </Box>
                                    ) : (
                                        <Typography
                                            sx={{
                                                mt: 1,
                                                py: 1,
                                                fontSize: 10,
                                                color: "#94A3B8",
                                                textAlign: "center",
                                            }}
                                        >
                                            No dispatch
                                        </Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }

            </Box>
        </Paper>
    );
};

export default YearlyRollerBreakdown;