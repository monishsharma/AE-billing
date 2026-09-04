import { Box, Skeleton } from '@mui/material';
import React from 'react'


const AreaChartSkeleton = () => {
    return (
        <Box sx={{ height: "100%" }}>
            <Box
                sx={{
                    height: 250,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1.5,
                    px: 2,
                }}
            >
                {[55, 85, 65, 62, 70, 25].map((height, index) => (
                    <Skeleton
                        key={index}
                        variant="rounded"
                        animation="wave"
                        sx={{
                            flex: 1,
                            height: `${height}%`,
                            borderRadius: "8px 8px 3px 3px",
                        }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: 1,
                }}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="text"
                        width={30}
                        height={18}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default AreaChartSkeleton;