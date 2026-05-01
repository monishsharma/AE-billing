import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from "./style.module.css"
import { createInitialValue, intialState } from './selector'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { isMobileDevice } from '../../../helpers/is-mobile-device'
import StepperButton from '../../steps/stepper-button'
import { VENDOR_STEPS } from '../../../constants/app-constant'
import { useNavigate } from 'react-router-dom';
import PageLoader from "../../page-loader"



const VendorSupplyRates = ({
    id,
    steps,
    index,
    prevStep,
    vendorForm,
    nextStep,
    saveData,
    updateVendorList,
    setCurrentStepConnect,
    updateVendorConnect
,}) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {supplyRate: vendorSupplyRateRows = []} = vendorForm || {};
    const [errors, setErrors] = useState([]);

    const addRow = () => {
        const newRow = createInitialValue()
        const updatedRows =[...vendorSupplyRateRows, newRow];
        saveData({
        stepName: VENDOR_STEPS.SUPPLY_RATE,
            data: {
                supplyRate: updatedRows
            }
        });
    }

    const deleteRow = ({ rowIndex }) => {
        const updatedRows =  [...vendorSupplyRateRows];
        updatedRows.splice(rowIndex, 1);

        saveData({
            stepName: VENDOR_STEPS.SUPPLY_RATE,
            data: {
                supplyRate: updatedRows
            }
        });
    };

    const validateRows = () => {
        const newErrors = vendorSupplyRateRows.map((row) => {
            let rowError = {};

            intialState.forEach((input) => {
                const value = row[input.name];

                // only validate required fields
                if ((!value || value === "")) {
                    rowError[input.name] = `${input.name} is required`;
                }
            });

            return rowError;
        });

        setErrors(newErrors);

        return newErrors.some(row => Object.keys(row).length > 0);
    };

    const onFieldChange = (event,rowIndex) => {
        const { name, value } = event.target;
        const updatedRows = [...vendorSupplyRateRows];
        updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [name]: value
        }

        saveData({
            stepName: VENDOR_STEPS.SUPPLY_RATE,
            data: {
                supplyRate: updatedRows
            }
        });
    }

    const nextStepHandler =  () => {
        const hasError = validateRows();
        if (hasError) return;
        setIsLoading(true);
        const {currentStep, ...rest} = vendorForm;
        const action = id ? () => updateVendorConnect(id, rest) : () => updateVendorList(rest)
        action()
        .then(() => {
            // reset currentstep and navigate to vendor list page
            setCurrentStepConnect(0);
            navigate(-1)
            setIsLoading(true);
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false);
        })
    }

    if (isLoading) return <PageLoader />

    return (
        <>
            <Box mt={2}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 1,
                        mb: 4
                    }}
                >
                    <Button variant='contained' color='primary' size='small' onClick={() => addRow()}>
                        Add Product
                    </Button>
                </Box>
                {
                    // isProductRateRequired &&
                    <div className={styles.flexContainer}>
                        <div className={styles.gridContainer}>
                            {
                                !isMobileDevice() ?
                                    <>
                                        <span>Product Description</span>
                                        <span>Description</span>
                                        <span>Rate</span>
                                        <span>Product Type</span>
                                    </>
                                    :
                                    <span>Product Item Rate</span>
                            }

                        </div>
                        {
                            vendorSupplyRateRows.map((row, rowIndex) => (
                                <div className={styles.itemsContainer} key={rowIndex}>
                                    {

                                        intialState.map((item, itemIndex) => (
                                                <span key={itemIndex}>
                                                    {
                                                        item.type === "select" ?
                                                        <FormControl fullWidth key={itemIndex}>
                                                        <InputLabel id={`${item.id}-label`}>{item.placeholder}</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                id={item.id}
                                                                labelId={`${item.id}-label`}
                                                                name={item.id}
                                                                variant='standard'
                                                                label={item.placeholder}
                                                                value={vendorSupplyRateRows[rowIndex]?.[item.key] || ""}
                                                                placeholder={item.placeholder}
                                                                onChange={(event) => onFieldChange(event, rowIndex)}
                                                                error={errors[rowIndex] && errors[rowIndex][item.key]}
                                                                 helperText={
                                                                    errors?.[rowIndex]?.[item.key] ? `${item.placeholder} is required` : ""
                                                                }
                                                                // disabled={item.extraProps && item.extraProps.disableOnEdit && id}
                                                                {...item.extraProps}
                                                            >
                                                                {
                                                                    item.extraProps.options.map((opt) => (
                                                                        <MenuItem key={opt.value.toUpperCase()} value={opt.value.toUpperCase()} >
                                                                            {opt.label}
                                                                        </MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        :
                                                            <TextField
                                                                fullWidth
                                                                multiline
                                                                id={item.label}
                                                                label={item.label}
                                                                name={item.key}
                                                                value={vendorSupplyRateRows[rowIndex]?.[item.key] || ""}
                                                                onChange={(event) => onFieldChange(event, rowIndex)}
                                                                error={errors[rowIndex] && errors[rowIndex][item.key]}
                                                                 helperText={
                                                                    errors?.[rowIndex]?.[item.key] ? errors?.[rowIndex]?.[item.key]: ""
                                                                }
                                                                // value={row[item.key]}
                                                                variant="standard"
                                                            // error={rowsValidation[index] && !rowsValidation[index][item.key]}
                                                            // onChange={(e) => onItemChange(e, index)}
                                                            />
                                                    }
                                                </span>
                                        ))
                                    }
                                    {vendorSupplyRateRows.length > 1 && <span className='mt-2' >
                                                <Button fullWidth color="error" variant="outlined" onClick={() => deleteRow({ index })}>
                                                    Delete
                                                </Button>
                                    </span>}
                                </div>

                            ))
                        }
                    </div>
                }
            </Box>
            <Box sx={{ mt: 4 }}>
                <StepperButton
                    steps={steps}
                    index={index}
                    handleNext={nextStepHandler}
                    handleBack={prevStep}
                />
            </Box>
        </>
    )
}


export default VendorSupplyRates