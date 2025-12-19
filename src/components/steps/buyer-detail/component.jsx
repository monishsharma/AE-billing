import React, { useState } from "react";
import {getCustomerDetail, INPUTS, orderTypeOptions} from "./selector";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StepperButton from '../stepper-button';
import { COMPANY, COMPANY_TYPE, STEPPER_NAME, VENDOR_NAME } from "../../../constants/app-constant";
import { useParams } from "react-router-dom";


const BuyerDetail = ({
    index,
    steps,
    config,
    handleNext,
    handleBack,
    invoiceForm,
    saveDataConnect
}) => {

    const { id } = useParams();


    const {
        invoiceDetail: {
            company: selectedCompany
        },
        buyerDetail: {
            customer,
            vendorCode,
            materialCode,
            orderType
        }
    } = invoiceForm;

    const {vendorsList = []} = config;


    const getValueByKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    };

    const OPTIONS = vendorsList.filter(vendor => vendor.type === getValueByKey(COMPANY_TYPE, selectedCompany));

    const invoiceFormDetail = {
        customer: customer || "",
        vendorCode: vendorCode || "",
        materialCode: materialCode || "",
        ...(selectedCompany === COMPANY_TYPE.ASHOK && {
            orderType: orderType || ""
        }),
    };

    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        customer: true,
        vendorCode: true,
        orderType: true,
        materialCode: true,
    });

    React.useEffect(() => {
        if (OPTIONS.length === 1 && selectedCompany === COMPANY_TYPE.ASHOK) {
            const selectedCustomer = OPTIONS[0];
            setInvoiceFormValidation({
                ...invoiceFormValidation,
                orderType: true,
            })
            const {
                materialCode,
            } = selectedCustomer;
            const customerDetail = getCustomerDetail({
                selectedCustomer,
                orderType: orderType || invoiceFormDetail.orderType || "",
                materialCode: materialCode || invoiceFormDetail.materialCode || ""
            });


            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    ...customerDetail
                }
            })
        }
    }, [])


    // React.useEffect(() => {
    //     if (selectedCompany === COMPANY_TYPE.PADMA && !!(OPTIONS.length)) {
    //         const index = OPTIONS.findIndex(option =>( option.id === customer || option.label === customer ));
    //         const selectedCustomer = OPTIONS[index];
    //         const customerDetail = getCustomerDetail({
    //             selectedCustomer,
    //             orderType: orderType || invoiceFormDetail.orderType || "",
    //             materialCode: materialCode || invoiceFormDetail.materialCode || ""
    //         });
    //         invoiceFormDetail["customer"] = selectedCustomer.id;
    //         saveDataConnect({
    //             stepName: STEPPER_NAME.BUYER_DETAIL,
    //             data: {
    //                 ...customerDetail
    //             }
    //         })
    //     }
    // }, [OPTIONS.length])


    const performValidation = () => {
        const updatedValidation = Object.keys(invoiceFormDetail).reduce((acc, key) => {
            acc[key] = !!invoiceFormDetail[key];
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
            const index = OPTIONS.findIndex(option => option.id === value);
            const selectedCustomer = OPTIONS[index];
            const customerDetail = getCustomerDetail({selectedCustomer});
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    ...customerDetail
                }
            })
        } else if (name === "orderType") {
            const selectedOption = orderTypeOptions.find(input => input.label === value);
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    [name]: value,
                    materialCode: selectedOption ? selectedOption.vCode : ""
                }
            })
        } else {
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    [name]: value.toUpperCase(),
                }
            })
        }

        setInvoiceFormValidation({
            ...invoiceFormValidation,
            [name]: !!value
        });
    };

    const checkRenderStatus = (type) => {
        if (selectedCompany === COMPANY_TYPE.PADMA) {
            if ( type.name === "orderType") {
                return false;
            }
            return true;
        }
        return true;
    }

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
                        checkRenderStatus(input) && <Grid key={index} item size={{xs:12, md: selectedCompany === COMPANY_TYPE.ASHOK ? 3 : 4}}>
                            {input.type === "select"  ? (
                                <FormControl fullWidth error={!invoiceFormValidation[input.key]}>
                                    <InputLabel id={`${input.id}-label`}>{input.placeholder}</InputLabel>
                                    <Select
                                        labelId={`${input.id}-label`}
                                        id={input.id}
                                        name={input.id}
                                        label={input.placeholder}
                                        value={invoiceFormDetail[input.key]}
                                        onChange={onFieldChange}
                                        disabled={input.extraProps && input.extraProps.disabledOnEdit && id}

                                    >
                                        {
                                            input.name === "customer" &&
                                            OPTIONS.map((option) => (
                                                <MenuItem key={option.id} value={`${option.id}`}>{option.label}</MenuItem>
                                            ))
                                        }
                                        {
                                            input.name === "orderType" &&
                                            input.extraProps.options.map((option, idx) => (
                                                <MenuItem key={idx} value={option.label}>{option.label}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {!invoiceFormValidation[input.key] && (
                                        <p style={{ color: 'red', fontSize: '12px', margin: "3px 0 0 14px" }}>
                                            {input.placeholder} is required
                                        </p>
                                    )}
                                </FormControl>
                            ) : ( input.type === "textField" ) && (
                                <Component
                                    {...input.extraProps}
                                    name={input.id}
                                    label={input.placeholder}
                                    variant='outlined'
                                    onChange={onFieldChange}
                                    value={invoiceFormDetail[input.key]}
                                    disabled={input.extraProps && input.extraProps.disabledOnEdit && id}
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
