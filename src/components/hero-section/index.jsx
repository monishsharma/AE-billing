import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const HeroSection = ({
    pageTitle,
    onClick = () => {},
    btnClassName = "customBtn",
    btnText,
    btnVariant = "contained",
    children,
    showButton = true,
    startIcon = null,
    subtitle="",
    style = {}
}) => {
    return (
        <Box mt={2}>
            <h2 className="fw-bold">{pageTitle}</h2>
            {subtitle && <Typography variant='subtitle2' sx={{ mt: "-5px", ml: 0.2,  color: "#64748B"}} className='fw-regualr'>{subtitle}</Typography>}
            <Box sx={{...style}}>
                {
                    showButton &&
                        <Button
                            sx={{
                                width: {
                                    xs: '100%',
                                    md: 'auto'
                                },
                                mt: {
                                    xs: 1
                                }
                            }}
                            startIcon={startIcon}
                            variant={btnVariant}
                            onClick={onClick}
                            className={btnClassName}
                        >
                            {btnText}
                        </Button>
                }
                {children}
            </Box>
        </Box>
    )
}

export default HeroSection;