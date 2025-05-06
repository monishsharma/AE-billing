import { Box, Grid, TextField, Button, Typography, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/action";

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(login(formData.email, formData.password));
    };

    if (loading) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'white',
            }}
        >
            <Grid
                container
                sx={{
                    height: '100%',
                }}
            >
                {!isMobile && (
                    <Grid
                        item
                        xs={6}
                        sx={{
                            height: '100%',
                            width: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "black",
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                width: '50%',
                                height: 'auto',
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>
                )}
                <Grid
                    item
                    xs={isMobile ? 12 : 6}
                    sx={{
                        height: '100%',
                        width: isMobile ? '100%' : '50%',
                        backgroundColor: "white",
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: isMobile ? '20px' : '0 50px'
                        }}
                    >
                        {isMobile && (
                            <Box
                                sx={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mb: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{
                                        width: '60%',
                                        height: 'auto',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                        )}
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{
                                mb: isMobile ? 2 : 4,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                px: isMobile ? 2 : 0
                            }}
                        >
                            Sign into Ashok Enterprises
                        </Typography>
                        {error && (
                            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                                {error}
                            </Typography>
                        )}
                        <Box sx={{
                            width: '100%',
                            maxWidth: isMobile ? '100%' : '400px',
                            px: isMobile ? 2 : 0
                        }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="standard"
                                sx={{ mb: isMobile ? 2 : 3 }}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="standard"
                                sx={{ mb: isMobile ? 3 : 4 }}
                                required
                            />
                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    '&:hover': {
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Login'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
