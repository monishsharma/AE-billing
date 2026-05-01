import React, { useState } from "react";
import {INPUTS, orderTypeOptions, SELECT_BRANCH} from "./selector";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import StepperButton from '../stepper-button';
import { COMPANY_TYPE, STEPPER_NAME } from "../../../constants/app-constant";
import { useParams } from "react-router-dom";
import { getCustomerDetail } from "../../../helpers/customer-detail";


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
            branch,
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
    const selectedCustomerObj = OPTIONS.find(opt => opt._id === customer);
    const branchOptions = selectedCustomerObj?.plantRows
    ? selectedCustomerObj.plantRows.map(plant => ({
        value: plant.id,
        label: plant.label
    }))
    : [];

    const invoiceFormDetail = {
        customer: customer || "",
        vendorCode: vendorCode || "",
        materialCode: materialCode || "",
        branch: branch || "",
        // ...(selectedCompany === COMPANY_TYPE.ASHOK && {
            orderType: orderType || ""
        // }),
    };

    const getIntialValdiationStatus = (key) => {
        return !!invoiceFormDetail[key];
    }
    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        customer: getIntialValdiationStatus("customer") || true,
        vendorCode: getIntialValdiationStatus("vendorCode") || true,
        orderType: getIntialValdiationStatus("orderType") || true,
        materialCode: getIntialValdiationStatus("materialCode") || true,
        branch: getIntialValdiationStatus("branch") || true,
    });

    // auto select branch if only one branch is available for selected customer
    React.useEffect(() => {
        if (branchOptions.length === 1 && !branch) {
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    branch: branchOptions[0].value
                }
            });
        }
    }, [branchOptions, branch]);

    // auto select customer if only one customer is availble
    React.useEffect(() => {
        if (OPTIONS.length === 1 && !id) {
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
                materialCode: materialCode || invoiceFormDetail.materialCode || "",
                branch: branch || invoiceFormDetail.branch || "",
            });


            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    ...customerDetail
                }
            })
        }
        if (selectedCompany === COMPANY_TYPE.PADMA && !orderType) {
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    orderType: "Roller",
                }
            })
        }
    }, []);

    // React.useEffect(() => {
    //     // add options as per selected customer
    //     const selectedCustomer = OPTIONS.find(option => option.id === customer);
    //     if (selectedCustomer) {
    //         setInputs(prev =>
    //             prev.map(input =>
    //                 input.key === "branch"
    //                     ? {
    //                         ...input,
    //                         extraProps: {
    //                             ...input.extraProps,
    //                             options: selectedCustomer.plantRows ? selectedCustomer.plantRows.map(plant => {
    //                                 return {
    //                                     value: plant.id,
    //                                     label: plant.label
    //                                 }
    //                             }) : [],
    //                         }
    //                     }
    //                     : input
    //             )
    //         );
    //     }
    // }, [])



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


    const onFieldChange = (event, selectedCustomer = null) => {
        const { value = "", name = "" } = event?.target || {};
        if (name === "customer" && selectedCustomer) {
            const customerDetail = getCustomerDetail({selectedCustomer, selectedCompany });
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    ...customerDetail
                }
            });
            return;
        }

        if (name === "branch") {
            // find the obj with selelcted branch from vendor detial and spread remaining valuable keys  like address gstin
            const selectedBranchObj = selectedCustomerObj?.plantRows?.find(plant => plant.id === value);
            const {id, ...rest} = selectedBranchObj || {};
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    branch: value,
                    ...rest
                }
            });
            return;
        }

        if (name === "orderType") {
            const selectedOption = orderTypeOptions.find(input => input.label === value);
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    [name]: value,
                    materialCode: selectedOption && selectedCompany === COMPANY_TYPE.ASHOK ? selectedOption.vCode : ""
                }
            })
        } else {
            saveDataConnect({
                stepName: STEPPER_NAME.BUYER_DETAIL,
                data: {
                    [name]: name === "materialCode" ? value.toUpperCase() : value,
                }
            })
        }

        setInvoiceFormValidation({
            ...invoiceFormValidation,
            ...(name === "customer" ? {
                    customer: selectedCustomer ? true : false
            } : {
                [name]: !!value
            }),
        });
    };

    // const checkRenderStatus = (type) => {
    //     if (selectedCompany === COMPANY_TYPE.PADMA) {
    //         if ( type.name === "orderType") {
    //             return false;
    //         }
    //         return true;
    //     }
    //     return true;
    // }

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
                    const options = input.key === "branch" ? branchOptions : input.extraProps.options || [];
                    return (
                         <Grid key={index} item size={{xs:12, md: 2.4}}>
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
                                        // disabled={input.extraProps && input.extraProps.disabledOnEdit && id}

                                    >
                                        {
                                            options.map((option, idx) => (
                                                <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>
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
                                    {...(input.name === "customer") ? {
                                        callback: onFieldChange,
                                        disableClearable: true,
                                        width: "100%",
                                        selectedCompany,
                                        allowPreset: true,
                                        id,
                                        value: invoiceFormDetail["customer"],

                                    } :{
                                        onChange: onFieldChange,
                                    }}
                                    name={input.id}
                                    label={input.placeholder}
                                    variant='outlined'
                                    // onChange={onFieldChange}
                                    // callback={onFieldChange}
                                    // disableClearable={true}
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
