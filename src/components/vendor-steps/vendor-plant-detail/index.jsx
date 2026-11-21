import { Box, Button, FormControl, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'
import { createPlantDetailInitialValue, PLANT_DETAIL_INPUTS } from './selector';
import { isMobileDevice } from '../../../helpers/is-mobile-device';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StepperButton from '../../steps/stepper-button';
import { VENDOR_STEPS, getCustomerGSTINDetail } from '../../../constants/app-constant';
import Divider from '@mui/material/Divider';

const VendorPlantDetails = ({
    index,
    steps,
    vendorForm,
    saveData,
    prevStep,
    nextStep
}) => {

    const plantRowsRef = React.useRef([]);
    const { plantRows: vendorPlantDetailRows } = vendorForm || {};
    const [errors, setErrors] = useState([]);
    const [scrollToIndex, setScrollToIndex] = useState(null);

    React.useEffect(() => {
        if (scrollToIndex === null) return;

        const timer = setTimeout(() => {
            const el = plantRowsRef.current[scrollToIndex];

            el?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            setScrollToIndex(null);
        }, 300);

        return () => clearTimeout(timer);
    }, [scrollToIndex]);

    const addRow = () => {
        const length = vendorPlantDetailRows?.length || 0;
        const newRow = createPlantDetailInitialValue()
        const updatedRows = [...vendorPlantDetailRows, newRow];
        saveData({
            stepName: VENDOR_STEPS.PLANT_DETAIL,
            data: {
                plantRows: updatedRows
            }
        });
        setScrollToIndex(length);

    }

    const deleteRow = ({ rowIndex }) => {
        const updatedRows = [...vendorPlantDetailRows];
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

    const onFieldChange = ({ event, rowIndex, input }) => {
        const { name, value } = event.target;
        const isCapalize = input?.extraProps?.capitalize;
        const formattedValue = isCapalize ? value.toUpperCase() : value;
        const updatedRows = [...vendorPlantDetailRows];

        if (name === "GSTIN") {
            const { PAN, state, code } = getCustomerGSTINDetail(value);
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

    const addPlantRow = () => {
        addRow({ rowForPlant: true })
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1, mb: 4
                }}
            >
                <Button className="outlinedCustomBtn" size='small' onClick={() => addPlantRow()}>
                    Add plant
                </Button>
            </Box>
            <Paper
                elevation={1}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    p: 2,
                    maxHeight: 300,
                    overflowY: "auto",
                }}
            >
                <Box sx={{}}>
                    {
                        vendorPlantDetailRows?.map((_, rowIndex) => {
                            return (
                                <>
                                    <Grid container spacing={2} mb={2} alignItems={"center"} justifyContent={"space-between"}>
                                        <Grid item>
                                            <Typography variant='h6' color={"text.primary"}>
                                                Plant {rowIndex + 1}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            {vendorPlantDetailRows.length > 1 && (
                                                <Button color="error" size="small" variant="outlined" onClick={() => deleteRow({ rowIndex })}>
                                                    <DeleteOutlinedIcon sx={{ mr: 1, width: 20, height: 20 }} />
                                                    Delete
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>

                                    <Grid ref={(el) => (plantRowsRef.current[rowIndex] = el)} key={rowIndex} container spacing={2} mb={2}>

                                        {
                                            PLANT_DETAIL_INPUTS.map((input, inputIDX) => {
                                                const Component = input.component;
                                                return (
                                                    <Grid size={{ md: 4, xs: 12 }} key={inputIDX}>
                                                        <Component
                                                            fullWidth
                                                            id={input.id}
                                                            name={input.name}
                                                            label={input.placeholder}
                                                            value={vendorPlantDetailRows[rowIndex]?.[input.name] || ""}
                                                            placeholder={input.placeholder}
                                                            onChange={(event) => onFieldChange({ event, rowIndex, input })}
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

                                        {/* {vendorPlantDetailRows.length > 1 && (
                                            <Grid width={"100%"} alignItems={"center"} mt={1} >
                                                <Button fullWidth color="error" variant="outlined" onClick={() => deleteRow({ rowIndex })}>
                                                    Delete
                                                </Button>
                                                <hr />
                                            </Grid>
                                        )} */}
                                        {vendorPlantDetailRows.length > 1 && <hr style={{ width: "100%", marginTop: 16, marginBottom: 16, borderColor: "divider" }} />}

                                    </Grid>
                                </>
                            )
                        })
                    }
                </Box>
            </Paper>
            <Box sx={{ mt: 4 }}>
                <StepperButton steps={steps} index={index} handleBack={prevStep} handleNext={nextStepHandler} />
            </Box>
        </>
    )
}

export default VendorPlantDetails