import { Button } from '@mui/material'
import React from 'react'

const HeroSection = ({
    pageTitle,
    onClick = () => {},
    btnClassName = "customBtn",
    btnText,
    btnVariant = "contained",
    children,
    showButton = true
}) => {
    return (
        <div className="mt-2">
            <h2 className="fw-bold">{pageTitle}</h2>
            {
                showButton &&
                <div className="mt-4">
                    <Button variant={btnVariant} onClick={onClick} className={btnClassName}>
                        {btnText}
                    </Button>
                </div>
            }
            {children}
        </div>
    )
}

export default HeroSection;