import { Box, FormControl, Grid, InputLabel, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { INPUTS, NO_VALIDATON_INPUTS } from './selector';
import StepperButton from '../../steps/stepper-button';
import { VENDOR_STEPS } from '../../../constants/app-constant';

const VendorDetails = ({
    steps,
    saveData,
    vendorForm,
    nextStep,
}) => {

    const [errors, setErrors] = useState(INPUTS.reduce((acc, input) => {
        if (!NO_VALIDATON_INPUTS.includes(input.name)) {
            acc[input.name] = false;
        }
        return acc;
    }, {}));

    const onFieldChange = ({ event, input }) => {
        const isCapalize = input.extraProps?.capitalize;
        const { name, value } = event.target;
        const formattedValue = isCapalize ? value.toUpperCase() : value;

        saveData({
            stepName: VENDOR_STEPS.VENDOR_DETAIL,
            data: {
                [name]: formattedValue
            }
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value.trim() === ""
        }));

    }

    const onClick = () => {
        // Check for errors before proceeding to the next step AND MARK ALL FIELDS TOUCHED
         const newErrors = {};
            INPUTS.forEach((input) => {
                if (NO_VALIDATON_INPUTS.includes(input.name)) {
                    newErrors[input.name] = false;
                    return;
                }
                const value = vendorForm?.[input.name] || "";
                newErrors[input.name] = value.trim() === "";
            }
        );
        const isValid = Object.values(newErrors).every(e => !e);
        if (isValid) {
            nextStep();
        } else {
        setErrors(newErrors);

        }
    }

    return (
        <>

            <Grid container spacing={2} mt={2}>
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
                                    value={vendorForm?.[input.name] || ""}
                                    placeholder={input.placeholder}
                                    onChange={(event) => onFieldChange({event, input})}
                                    type={input.extraProps?.type || "text"}
                                    error={errors[input.key]}
                                    helperText={errors[input.name] ? `${input.placeholder} is Required` : ""}
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
            <Box sx={{ mt: 4 }}>
                <StepperButton  steps={steps} handleNext={onClick} />
            </Box>
        </>
    )
}

export default VendorDetails