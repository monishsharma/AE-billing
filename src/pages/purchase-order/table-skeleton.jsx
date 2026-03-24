import { TableCell, TableRow, Skeleton, Box } from '@mui/material'
import React from 'react'

const TableSkeleton = () => {
    return (
        [...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
                <TableRow>
                    <TableCell><Skeleton width={10} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell width={220}>
                        <Box>
                            <Skeleton
                                variant="rectangular"
                                height={6}
                                sx={{ borderRadius: 5 }}
                            />

                        </Box>
                    </TableCell>
                </TableRow>

            </React.Fragment>
        ))
    )
}

export default TableSkeleton