import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { INPUTS } from './selector';
import StepperButton from '../stepper-button';
import { COMPANY, COMPANY_TYPE, STEPPER_NAME } from '../../../constants/app-constant';
import { getNextInvoiceNo, getPreviousInvoiceNo } from '../../../helpers/get-invoice-no';
import { useParams } from 'react-router-dom';

export default function InvoiceDetail({
  index,
  steps,
  handleNext,
  handleBack,
  invoiceForm,
  saveDataConnect
}) {

    const { id } = useParams();

    const today = new Date().toISOString().split("T")[0];

    const { invoiceDetail: invoiceDetailState, config = {} } = invoiceForm;

    const getKeyByValue = (value) => {
        return Object.entries(COMPANY_TYPE).find(([, val]) => val === value)?.[0] || null;
    };

    const company = React.useMemo(() => getKeyByValue(invoiceDetailState.company || ""), [invoiceDetailState.company]);


    const invoiceFormDetail = {
        invoiceNO: invoiceDetailState.invoiceNO  || "",
        invoiceDate: invoiceDetailState.invoiceDate || today || "",
        company: invoiceDetailState.company || ""
    };

    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        invoiceNO: true,
        invoiceDate: true,
        company: true
    });

    React.useEffect(() => {
        if (
            invoiceDetailState &&
            invoiceDetailState.company &&
            config[company] && !id
        ) {
            const invoiceNo = getNextInvoiceNo(config[company]);

            saveDataConnect({
                stepName: STEPPER_NAME.INVOICE_DETAILS,
                data: {
                    invoiceNO: invoiceNo,
                    invoiceDate: invoiceDetailState.invoiceDate || today
                }
            });

            setInvoiceFormValidation((prev) => ({
                ...prev,
                invoiceNO: !!invoiceNo
            }));
        }
    }, [invoiceDetailState.company, config, company, id]);


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
        const { value, name } = event.target
        const {vendorList, ...otherData} = name === "company" && value && COMPANY[value] || {};

        saveDataConnect({
            stepName: STEPPER_NAME.INVOICE_DETAILS,
            data: {
                [name]: value.toUpperCase(),
                ...(name === "company" && {
                    ...otherData
                })
            }
        })
        setInvoiceFormValidation({
            ...invoiceFormValidation,
            [name]: !!value,
        });
    };

    return (
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
                                        disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                        onChange={onFieldChange}
                                    >
                                        {input.extraProps.options.map((option, idx) => (
                                            <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                    {!invoiceFormValidation[input.key] && (
                                        <p style={{ color: 'red', fontSize: '12px', margin: "3px 0 0 14px" }}>
                                            {input.placeholder} is required
                                        </p>
                                    )}
                                </FormControl>
                            ) : (
                                <>
                                    <Component
                                        {...input.extraProps}
                                        name={input.id}
                                        label={input.placeholder}
                                        variant='outlined'
                                        disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                        onChange={onFieldChange}
                                        value={invoiceFormDetail[input.key]}
                                        error={!invoiceFormValidation[input.key]}
                                        helperText={invoiceFormValidation[input.key] ? "" : `${input.placeholder} is required`}
                                        fullWidth
                                    />
                                    {input.description && company && !id && <span style={{fontSize: "10px", marginLeft: "5px", color: "Grey"}}>Previous Invoice no: {getPreviousInvoiceNo(config[company])}</span>}
                                </>
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
    );
}
