import React from 'react';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Box } from '@mui/material';

const AccessDenied = () => {
  return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"} gap={2}>
            <LockOutlineIcon style={{ fontSize: 80 }} />
            <h2>Access Denied</h2>
            <p>You do not have permission to view this page.</p>
        </Box>
  )
}

export default AccessDenied