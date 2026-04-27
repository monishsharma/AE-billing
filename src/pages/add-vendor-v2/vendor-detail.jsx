import { Box, FormControl, Grid, InputLabel, MenuItem } from '@mui/material';
import React from 'react'
import { INPUTS } from './selector';

const VendorDetails = ({
    onFieldChange
}) => {
  return (
    <>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <h6 className="fw-bold mt-4 mb-4">Vendor Detail</h6>
        </Box>
        <Grid container spacing={2}>
            {
                INPUTS.map((input, index) => {
                    const Component = input.component;
                    const options = input.extraProps?.options;
                    return (
                        <Grid  size={{md: 4, xs: 12}} key={index}>
                            <FormControl fullWidth >

                            {
                                input.type === "select" &&
                                <InputLabel id={`${input.id}-label`}>{input.placeholder}</InputLabel>
                            }
                            <Component
                                fullWidth
                                id={input.id}
                                name={input.name}
                                label={input.placeholder}
                                {...(input.type === "select") && {
                                    labelId: `${input.id}-label`
                                }}
                                // value={quotation?.[input.stepName]?.[input.name] || ""}
                                placeholder={input.placeholder}
                                onChange={(event) => onFieldChange({event})}
                                type={input.extraProps?.type || "text"}
                                // error={!quotationFormValidation[input.key]}
                                // disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                {...input.extraProps}
                            >
                                {
                                    options?.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value} >
                                            {opt.label}
                                        </MenuItem>
                                ))}
                            </Component>
                            </FormControl>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
  )
}

export default VendorDetails