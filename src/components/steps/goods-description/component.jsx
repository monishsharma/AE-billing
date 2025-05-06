import React, { useRef, useState } from "react";
import Box from '@mui/material/Box';
import {Autocomplete, Button, FormControl, Grid, InputLabel, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { createInitialValue, createInitialValueValidation, initialState, INPUTS, columns } from './selector';
import StepperButton from '../stepper-button';
import { COMPANY_TYPE, STEPPER_NAME, VENDOR_NAME } from '../../../constants/app-constant';
import Items from "../../items";
import styles from "./style.module.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CustomSelect from "../../custom-select";
import Summary from "../../summary";
import { useParams } from "react-router-dom";
import { isMobileDevice } from "../../../helpers/is-mobile-device";

const GoodsDescription = ({
    index,
    steps,
    config,
    handleNext,
    handleBack,
    invoiceForm,
    saveDataConnect
}) => {

    const {
        [STEPPER_NAME.INVOICE_DETAILS]: { company: selectedCompany },
        [STEPPER_NAME.BUYER_DETAIL]: { customer },
        [STEPPER_NAME.GOODS_DESCRIPTION]: { po, serial, HSN, items,type = "" },
    } = invoiceForm;

    const {vendorsList = []} = config;

    const { id: invoiceId } = useParams();

    const getValueByKey = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    };

    const list = vendorsList.filter(vendor => vendor.type === getValueByKey(COMPANY_TYPE, selectedCompany));
    const selectedVendor = list.filter(item => item.label === customer) || {};
    const OPTIONS = selectedVendor && selectedVendor[0]?.supplyRate || [];

    const invoiceFormDetail = {
        po: po || "",
        serial: serial || "",
        HSN: HSN || "",
        type: type || ""
    };

    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        po: true,
        serial: true,
        HSN: true,
        type: true
    });

    const [itemsValidation, setItemsValidation] = useState([]);

    const [totalItems, setTotalItems] = useState([]);

    const [localItems, setLocalItems] = useState([]);

    const inputRefs = useRef([]);

    const lastSavedItemsRef = React.useRef(localItems);

    React.useEffect(() => {
        setLocalItems(items);
    }, [items]);

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            const isEqual = JSON.stringify(lastSavedItemsRef.current) === JSON.stringify(localItems);
            if (!isEqual) {
                saveDataConnect({
                    stepName: STEPPER_NAME.GOODS_DESCRIPTION,
                    data: { items: localItems },
                });
                lastSavedItemsRef.current = localItems;
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [localItems]);

    const onFieldChange = (event) => {
        const { value, name } = event.target;
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                [name]: value
            }
        })
        setInvoiceFormValidation(prev => ({
            ...prev,
            [name]: !!value
        }));
    };

    React.useEffect(() => {
        setTotalItems(items);
    }), [items]

    React.useEffect(() => {
        if (items.length !== itemsValidation.length) {
            setItemsValidation(items.map(() => createInitialValueValidation()));
        }
    }, [items.length]);

    const performValidation = () => {
        const updatedValidation = Object.keys(invoiceFormDetail).reduce((acc, key) => {
            acc[key] = !!invoiceFormDetail[key];
            return acc;
        }, {});

        setInvoiceFormValidation(updatedValidation);
        return Object.values(updatedValidation).every(Boolean);
    };

    const validateAllItems = (itemsValidation) => {
        const updatedValidation = itemsValidation.map((validationObj) => {
            return Object.keys(validationObj).reduce((acc, key) => {
                acc[key] = !!validationObj[key];
                return acc;
            }, {});
        });

        setItemsValidation(updatedValidation);
        return updatedValidation;
    };

    const handleNextHandler = () => {
        const isInvoiceValid = performValidation();
        const validationResult = validateAllItems(items);
        const isItemsValid = validationResult.every(validationObj =>
            Object.values(validationObj).every(Boolean)
        );
        if (isInvoiceValid && isItemsValid) {
            handleNext();
        }
    };

    const addItem = () => {
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                items: [...items, createInitialValue()]
            }
        })
    };

    const onItemChange = (event, index) => {
        const { value, name } = event.target;
        setLocalItems((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [name]: value,
            };
            return updated;
        });
    };

    const onChangeAutoComplete = ({e: event, newValue: value, idx: index}) => {
        const { target: { id, value: inputValue } } = event;
        const finalValue = inputValue ? inputValue : value || "";

        // Split the value properly to handle long descriptions
        const parts = finalValue.split("-");
        let description = "";
        if (parts.length > 2) {
            // Join all parts after the second one to get the full description
            description = parts.slice(2).join("-").trim();
        }

        const selectedId = id.split("-")[0];
        const selectedValue = parts.length > 1 ? parts[1] : finalValue;

        const copyOfItems = [...items];
        copyOfItems[index] = {
            ...copyOfItems[index],
            ...(!invoiceId && {
                description: description
            }),
            [selectedId || "rate"]: selectedValue || 0,
        };
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                items: copyOfItems
            }
        });
    };

    const deleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                items: updatedItems
            }
        });
    }

    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%',height: "100%" } }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    {INPUTS.map((input, index) => {
                        const Component = input.component;
                        return (
                            <Grid key={index} item size={{xs:12, md: 3}}>
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
                                            {
                                                input.options.map((opt) =>
                                                    <MenuItem  value={opt.label}>{opt.label}</MenuItem>
                                                )
                                            }
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
                                            variant="outlined"
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
                <div className="mt-4">
                    <Items columns={columns}>
                        {localItems.map((item, idx) => (
                            <div className={styles.itemsContainer}  key={idx}>
                                {initialState.map((row, index) => (
                                    <span key={index}>
                                        {row.dropdown ? (
                                            <Autocomplete
                                                freeSolo
                                                id={row.key}
                                                name={row.key}
                                                fullWidth
                                                label={row.key}
                                                value={item[row.key]}
                                                onChange={(e,newValue) => onChangeAutoComplete({e,newValue,idx})}
                                                options={OPTIONS ? OPTIONS.map((option) => `${option.type}-${option.rate}-${option.description}`) : []}
                                                getOptionLabel={(option) => (option && option.toString().split("-").length > 1 ? option.split("-")[1] : `${(option)}` )}
                                                renderOption={(props, option) => {
                                                    const {key, ...restProps} = props;
                                                    return <li key={`${key}_${props.id}`} {...restProps} style={{fontSize: "12px"}}>{option.split("-")[0]}</li>
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Rate"
                                                        variant="standard"
                                                        id={row.key}
                                                        placeholder={row.label}
                                                        name={row.key}
                                                        value={item[row.key] || ''}
                                                        error={!itemsValidation[idx][row.key]}
                                                        onChange={(e) => onChangeAutoComplete({e, idx})}
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            style: {
                                                                textAlign: 'left',
                                                                padding: '8px 0'
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                id={row.label}
                                                label={row.label}
                                                inputRef={(el) => (inputRefs.current[idx] = el)}
                                                name={row.key}
                                                value={item[row.key] || ''}
                                                variant="standard"
                                                error={!itemsValidation[idx][row.key]}
                                                onChange={(e) => onItemChange(e, idx)}
                                                inputProps={{
                                                    style: {
                                                        textAlign: 'left',
                                                        padding: '8px 0',
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word'
                                                    }
                                                }}
                                                {...row.extraProps}
                                            />
                                        )}
                                    </span>
                                ))}
                                {items .length > 1 && <span onClick={() => deleteItem(idx)}>
                                    {
                                        isMobileDevice()?
                                        <Button fullWidth color="error" variant="outlined"  onClick={deleteItem}>
                                            Delete
                                        </Button>
                                        :
                                        <DeleteOutlinedIcon color="error" />
                                    }

                                </span>}
                            </div>
                        ))}
                    </Items>
                </div>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button color="primary"  onClick={addItem}>
                        Add More Item
                    </Button>
                </Box>
                <div className="mt-4">
                    <Summary invoiceForm={invoiceForm} saveDataConnect={saveDataConnect}/>
                </div>

                <StepperButton
                    index={index}
                    steps={steps}
                    handleNext={handleNextHandler}
                    handleBack={handleBack}
                />

            </Box>
        </>
    );
};

export default GoodsDescription;
