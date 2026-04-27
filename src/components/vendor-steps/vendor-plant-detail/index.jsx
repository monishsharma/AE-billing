import { Box, Button, FormControl, Grid } from '@mui/material';
import React, { useState } from 'react'
import { createPlantDetailInitialValue, PLANT_DETAIL_INPUTS } from './selector';
import { isMobileDevice } from '../../../helpers/is-mobile-device';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StepperButton from '../../steps/stepper-button';
import { VENDOR_STEPS, getCustomerGSTINDetail } from '../../../constants/app-constant';

const VendorPlantDetails = ({
    index,
    steps,
    vendorForm,
    saveData,
    prevStep,
    nextStep
}) => {

    const {plantRows: vendorPlantDetailRows} = vendorForm || {};
    const [errors, setErrors] = useState([]);



    const addRow = () => {
        const newRow = createPlantDetailInitialValue()
        const updatedRows =[...vendorPlantDetailRows, newRow];
       saveData({
        stepName: VENDOR_STEPS.PLANT_DETAIL,
        data: {
            plantRows: updatedRows
        }
       });
    }

    const deleteRow = ({ rowIndex }) => {
        const updatedRows =  [...vendorPlantDetailRows];
        updatedRows.splice(rowIndex, 1);

        saveData({
            stepName: VENDOR_STEPS.PLANT_DETAIL,
            data: {
                plantRows: updatedRows
            }
        });
    }

    const validateRows = () => {
        const newErrors = vendorPlantDetailRows.map((row) => {
            let rowError = {};

            PLANT_DETAIL_INPUTS.forEach((input) => {
                const value = row[input.name];

                // only validate required fields
                if ((!value || value === "")) {
                    rowError[input.name] = `${input.placeholder} is required`;
                }
            });

            return rowError;
        });

        setErrors(newErrors);

        return newErrors.some(row => Object.keys(row).length > 0);
    };

    const onFieldChange = ({event, rowIndex, input}) => {
        const { name, value } = event.target;
        const isCapalize = input?.extraProps?.capitalize;
        const formattedValue = isCapalize ? value.toUpperCase() : value;
        const updatedRows = [...vendorPlantDetailRows];

        if (name === "GSTIN") {
            const {PAN, state, code} = getCustomerGSTINDetail(value);
            updatedRows[rowIndex] = {
                ...updatedRows[rowIndex],
                [name]: formattedValue,
                PAN: PAN.toUpperCase(),
                state: state,
                stateCode: code
            }
            saveData({
                stepName: VENDOR_STEPS.PLANT_DETAIL,
                data: {
                    plantRows: updatedRows
                }
            });
            return;
        }

        updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [name]: formattedValue
        }

        saveData({
            stepName: VENDOR_STEPS.PLANT_DETAIL,
            data: {
                plantRows: updatedRows
            }
        });
    }


    const nextStepHandler = () => {
        const hasError = validateRows();
        if (hasError) return;
        nextStep();
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt:1, mb:4
                }}
            >
                <Button variant='contained' color='primary' size='small'  onClick={() => addRow({rowForPlant: true})}>
                    Add plant
                </Button>
            </Box>
            <Box sx={{  }}>
                {
                    vendorPlantDetailRows?.map((_, rowIndex) => {
                        return (
                            <Grid key={rowIndex} container spacing={2} mb={2}>
                                {
                                    PLANT_DETAIL_INPUTS.map((input, inputIDX) => {
                                        const Component = input.component;
                                        return (
                                            <Grid  size={{md: 4,xs: 12}} key={inputIDX}>
                                                    <Component
                                                        fullWidth
                                                        id={input.id}
                                                        name={input.name}
                                                        label={input.placeholder}
                                                        value={vendorPlantDetailRows[rowIndex]?.[input.name] || ""}
                                                        placeholder={input.placeholder}
                                                        onChange={(event) => onFieldChange({event, rowIndex, input})}
                                                        type={input.extraProps?.type || "text"}
                                                        error={!!errors?.[rowIndex]?.[input.name]}
                                                        helperText={
                                                            errors?.[rowIndex]?.[input.name] ? `${input.placeholder} is required` : ""
                                                        }
                                                        // disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                                        {...input.extraProps}
                                                    />

                                            </Grid>
                                        )
                                    })
                                }
                                {vendorPlantDetailRows.length > 1 && (
                                    <Grid width={"100%"} alignItems={"center"}  mt={1} >
                                        <Button fullWidth color="error"  variant="outlined"  onClick={() => deleteRow({rowIndex})}>
                                            Delete
                                        </Button>
                                        <hr />
                                    </Grid>
                                )}
                            </Grid>
                        )
                    })
                }
            </Box>
            <Box sx={{ mt: 4 }}>
                <StepperButton  steps={steps} index={index} handleBack={prevStep} handleNext={nextStepHandler} />
            </Box>
        </>
    )
}

export default VendorPlantDetails