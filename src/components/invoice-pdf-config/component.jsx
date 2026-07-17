import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { INVOICE_CONFIG } from './selector'

const InvoicePdfConfig = ({
    postConfigConnect,
}) => {

    // State to hold the config data
    const [configData, setConfigData] = React.useState(
        Object.fromEntries(INVOICE_CONFIG.map((config) => [config.key, '']))
    );
    const [errorState, setErrorState] = React.useState(
        Object.fromEntries(INVOICE_CONFIG.map((config) => [config.key, false]))
    );

    const handleChange = (key, value) => {
        setConfigData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSave = () => {
        // save sate for each field if it is empty or not
        const newErrorState = Object.fromEntries(
            INVOICE_CONFIG.map((config) => [config.key, !configData[config.key]])
        );
        setErrorState(newErrorState);

        // if any field is empty, return
        if (Object.values(newErrorState).some((error) => error)) {
            return;
        }
        const invoicePdfConfig = {
            invoicePdfConfig: configData
        }
        postConfigConnect(invoicePdfConfig)
            .then(() => {
                alert("Config saved successfully");
            })
            .catch((error) => {
                alert("Error saving config: " + error.message);
            });
    }

    return (
        <Paper
            elevation={8}
            sx={(theme) => ({
                width: "100%",
                minHeight: "100px",
                backgroundColor: "#ffffff",
                p: 2,
                mb: 4,
                overflow: "auto",

            })}
        >
            <Typography variant='h6' color='black' >
                Invoice Pdf Config
            </Typography>
            <Box mt={2} display="flex" flexDirection="row" gap={2}>
                {
                    INVOICE_CONFIG.map((config) => (
                        <TextField
                            fullWidth
                            type="number"
                            label={config.label}
                            variant="outlined"
                            key={config.key}
                            error={errorState[config.key]}
                            value={configData[config.key] || ''}
                            onChange={(e) => handleChange(config.key, e.target.value)}
                        />
                    ))
                }

            </Box>
            <Box mt={2} display="flex" >
                <Button variant="contained" className="customBtn" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </Box>

        </Paper>
    )
}

export default InvoicePdfConfig