import { Box, Card, Paper, Skeleton, Typography } from '@mui/material'
import React from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ShimmerIcon from '../../shared/components/shimmer-icon';

const CardV2 = ({
    cardKey,
    index,
    title,
    value,
    cardIcon: CardIcon,
    iconColor,
    isLoading = false,
    cardIconBgColor,
    bgColor,
    growth = {},
    spanText = "",
    showGrowthIcon
}) => {

    const {hasGrow, growthPercentage, color} = growth || {};
    const Icon = hasGrow ? ArrowUpwardOutlinedIcon : ArrowDownwardOutlinedIcon;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                border: "1px solid #E2E8F0",
                borderRadius: "14px",
                maxHeight: 125,
                border: "1px solid #E2E8F0",
                background: bgColor
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2.5,
                    maxHeight: 170,
                    minWidth: 250
                }}
            >
                {/* LEFT ICON */}
                <Box
                    sx={{
                        width: 52,
                        height: 52,
                        flexShrink: 0,
                        borderRadius: "50%",
                        backgroundColor: cardIconBgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CardIcon
                        sx={{
                            fontSize: 27,
                            color: iconColor,
                        }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#475569",
                            textTransform: "uppercase",
                            letterSpacing: "0.3px",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: "25px",
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        {
                            isLoading ?
                                <Skeleton
                                    variant="text"
                                    width={175}
                                    height={31.5}
                                    mt={1}
                                    animation="wave"
                                />
                                :

                                ` ${index === 3 ? `${value}` : `₹ ${value}`}`
                        }

                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                            // margin: isLoading || index !== 0 || index !== 3 ? 0 : "0 -5px"
                        }}
                    >
                        {
                            isLoading ?
                                <Box >
                                    <Skeleton
                                        variant="text"
                                        width={50}
                                        height={25}
                                        animation="wave"
                                    />
                                </Box>
                                :
                                <>
                                    {
                                        <>
                                            {
                                                showGrowthIcon &&
                                                <ShimmerIcon
                                                    color= {color}
                                                    icon={Icon}
                                                />
                                            }

                                            <Typography
                                                sx={{
                                                    color: color,
                                                    fontSize: "13px",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {`${growthPercentage} %`}
                                            </Typography>
                                        </>
                                    }
                                </>
                        }

                        <Typography
                            sx={{
                                color: "#64748B",
                                fontSize: "12px",
                                fontWeight: 500,
                            }}
                        >
                            {spanText}
                        </Typography>
                    </Box>

                </Box>
            </Box>
        </Paper>
    )
}

export default CardV2