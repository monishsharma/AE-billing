import React, { useState } from "react";
import {INPUTS} from "./selector";
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StepperButton from '../stepper-button';
import { COMPANY, COMPANY_TYPE, STEPPER_NAME, VENDOR_NAME } from "../../../constants/app-constant";


const BuyerDetail = ({
    index,
    steps,
    config,
    handleNext,
    handleBack,
    invoiceForm,
    saveDataConnect
}) => {

    const {
        invoiceDetail: {
            company: selectedCompany
        },
        buyerDetail: {
            customer,
            vendorCode,
            materialCode
        }
    } = invoiceForm;

    const {vendorsList = []} = config;

    const isUnqiueVendor = [VENDOR_NAME.PARINAMITRA_ELECTRICALS,VENDOR_NAME.RAJASTHAN_EXPLOSIVES_AND_CHEMICALS_LTD].includes(customer);

    const getValueByKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    };

    const OPTIONS = vendorsList.filter(vendor => vendor.type === getValueByKey(COMPANY_TYPE, selectedCompany));

    const invoiceFormDetail = {
        customer: customer || "",
        vendorCode: vendorCode || "",
        materialCode: materialCode || ""
    };

    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        customer: true,
        vendorCode: true,
        materialCode: true
    });

    React.useEffect(() => {
        if (OPTIONS.length === 1) {
            const selectedCustomer = OPTIONS[0];
            const {
                address,
                isInterState,
                vendorCode,
                GSTIN,
                PAN,
                name,
                type,
                state,
                materialCode,
            } = selectedCustomer;
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    customer: selectedCustomer.label,
                    address,
                    isInterState,
                    vendorCode,
                    GSTIN,
                    PAN,
                    name,
                    type,
                    state,
                    materialCode
                }
            })
        }
    }, [])



    const performValidation = () => {
        const updatedValidation = Object.keys(invoiceFormDetail).reduce((acc, key) => {
            if (isUnqiueVendor) {
                if (["vendorCode","materialCode"].includes(key)) {
                    acc[key] = true;
                } else {
                    acc[key] = !!invoiceFormDetail[key];
                }
            } else {
                acc[key] = !!invoiceFormDetail[key];
            }
            return acc;
        }, {});

        setInvoiceFormValidation(updatedValidation);
        return Object.values(updatedValidation).every(Boolean);
    };

    const handleNextHandler = () => {
        if (performValidation()) {
            handleNext()
        }
    };


    const onFieldChange = (event) => {
        const { value, name } = event.target;
        if (name === "customer") {
            const index = OPTIONS.findIndex(option => option.label === value);
            const selectedCustomer = OPTIONS[index];
            const {
                    address,
                    isInterState,
                    vendorCode,
                    GSTIN,
                    PAN,
                    name,
                    type,
                    state,
                    materialCode
                } = selectedCustomer;
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    customer: selectedCustomer.label,
                    address,
                    isInterState,
                    vendorCode,
                    GSTIN,
                    PAN,
                    name,
                    type,
                    state,
                    materialCode

                }
            })
        } else {
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    [name]: value
                }
            })
        }

        setInvoiceFormValidation({
            ...invoiceFormValidation,
            [name]: !!value
        });
    };



    return (
        <>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}>
                {INPUTS.map((input, index) => {
                    const Component = input.component;
                    return (
                        <Grid key={index} item size={{xs:12, md: 4}}>
                            {input.type === "select" ? (
                                <FormControl fullWidth error={!invoiceFormValidation[input.key]}>
                                    <InputLabel id={`${input.id}-label`}>{input.placeholder}</InputLabel>
                                    <Select
                                        labelId={`${input.id}-label`}
                                        id={input.id}
                                        name={input.id}
                                        label={input.placeholder}
                                        value={invoiceFormDetail[input.key]}
                                        onChange={onFieldChange}
                                    >
                                         {OPTIONS.map((option, idx) => (
                                            <MenuItem key={idx} value={option.label}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    {!invoiceFormValidation[input.key] && (
                                        <p style={{ color: 'red', fontSize: '12px', margin: "3px 0 0 14px" }}>
                                            {input.placeholder} is required
                                        </p>
                                    )}
                                </FormControl>
                            ) : (
                                <Component
                                    {...input.extraProps}
                                    name={input.id}
                                    label={input.placeholder}
                                    variant='outlined'
                                    onChange={onFieldChange}
                                    value={invoiceFormDetail[input.key]}
                                    error={!invoiceFormValidation[input.key]}
                                    helperText={invoiceFormValidation[input.key] ? "" : `${input.placeholder} is required`}
                                    fullWidth
                                />
                            )}
                        </Grid>
                    );
                })}
            </Grid>
            <StepperButton
                index={index}
                steps={steps}
                handleNext={handleNextHandler}
                handleBack={handleBack}
            />
        </Box>
        </>
    )
};

export default BuyerDetail;
