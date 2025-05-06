import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Typography variant="h1" sx={{
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#1976d2',
                mb: 2
            }}>
                404
            </Typography>
            <Typography variant="h4" sx={{
                mb: 4,
                color: '#333'
            }}>
                Page Not Found
            </Typography>
            <Typography variant="body1" sx={{
                mb: 4,
                color: '#666',
                textAlign: 'center',
                maxWidth: '400px'
            }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                    px: 4,
                    py: 1.5,
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1565c0'
                    }
                }}
            >
                Back to Login
            </Button>
        </Box>
    );
};

export default NotFound;