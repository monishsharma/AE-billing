import { Box, Button } from '@mui/material'
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
    style = {}
}) => {
    return (
        <Box mt={2}>
            <h2 className="fw-bold">{pageTitle}</h2>
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