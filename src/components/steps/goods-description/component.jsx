import React, { use, useRef, useState } from "react";
import Box from '@mui/material/Box';
import {Autocomplete, Button, FormControl, Grid, InputLabel, Select, Skeleton, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { createInitialValue, createInitialValueValidation, initialState, INPUTS, columns, ASN_INITIAL_STATE } from './selector';
import StepperButton from '../stepper-button';
import { COMPANY_TYPE, STEPPER_NAME, VENDOR_NAME } from '../../../constants/app-constant';
import Items from "../../items";
import styles from "./style.module.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Summary from "../../summary";
import { useParams } from "react-router-dom";
import { isMobileDevice } from "../../../helpers/is-mobile-device";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CustomAutocomplete from "../../../shared/components/autocomplete";
import { toast, Bounce } from "react-toastify";
import ClearIcon from '@mui/icons-material/Clear';


const GoodsDescription = ({
    index,
    steps,
    config,
    handleNext,
    handleBack,
    invoiceForm,
    saveDataConnect,
    getPODetailConnect,
    postHsnCodeConnect,
    deleteHsnCodeConnect,
    getHsnCodeListConnect
}) => {

    const {
        [STEPPER_NAME.INVOICE_DETAILS]: { company: selectedCompany },
        [STEPPER_NAME.BUYER_DETAIL]: { customer },
        [STEPPER_NAME.GOODS_DESCRIPTION]: { po, serial, HSN, items = [],type = "" },
    } = invoiceForm;

    const {vendorsList = [], hsn: HSNLIst = []} = config;

    const { id: invoiceId } = useParams();

    const showToast = ({ type, text, ...rest }) =>
            toast[type](text, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                ...rest,
    });

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

    const [isFetchingPO, setIsFetchingPO] = useState(true);

    const [totalItems, setTotalItems] = useState([]);

    const [localItems, setLocalItems] = useState([]);

    const [poDetail, setPoDetail] = useState(null);

    const [asnQty, setAsnQty] = useState([ASN_INITIAL_STATE]);

    const inputRefs = useRef([]);

    const lastSavedItemsRef = React.useRef(localItems);

    React.useEffect(() => {
        setLocalItems(items);
    }, [items]);

    React.useEffect(() => {
        if (po && po.length === 10 && selectedCompany === COMPANY_TYPE.ASHOK) {
            setIsFetchingPO(true);
            getPODetailConnect({ poNumber: po })
            .then((res) => {
                setPoDetail(res.poDetail);
                setIsFetchingPO(false);

            })
            .catch((error) => {
                setPoDetail([]);
                console.error("Error fetching PO details:", error);
                setIsFetchingPO(false);
            });
        }
    }, [po]);

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

    React.useEffect(() => {
        if (invoiceId && selectedCompany === COMPANY_TYPE.ASHOK && po && po.length === 10 && poDetail) {
            const updatedAsnQty = items.map((item) => {
                const matchedPoItem = poDetail.items.find(poItem => poItem.itemNo === item.sno);
                if (matchedPoItem) {
                    return {
                        totalQty: matchedPoItem.totalQty,
                        qtyLeft: matchedPoItem.openQty,
                    };
                } else {
                    return {
                        totalQty: 0,
                        qtyLeft: 0,
                    };
                }

            });
            setAsnQty(updatedAsnQty);
        }

    }, [invoiceId, po, poDetail, selectedCompany, items.length]);

    const onFieldChange = (event) => {
        const { value = "", name = "" } = event.target;
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                [name]: value.toUpperCase(),
            }
        })
        setInvoiceFormValidation(prev => ({
            ...prev,
            [name]: !!value
        }));
    };

const onAutocompleteChange = (event, valueOrInput, reasonOrUndefined) => {
    // Detect if this is from onInputChange (3 args) or onChange (2 args)
    let value;

    // If 3rd argument exists, this is onInputChange
    if (typeof reasonOrUndefined === 'string') {
        value = valueOrInput; // it's a string typed in
    } else {
        // It's from onChange
        const newValue = valueOrInput;
        if (newValue && typeof newValue === 'object' && newValue.label) {
            value = newValue.label;
        } else {
            value = newValue; // may be string if user entered manually
        }
    }

    // Now safe to use `value`
    saveDataConnect({
        stepName: STEPPER_NAME.GOODS_DESCRIPTION,
        data: {
            HSN: value,
        }
    });

    setInvoiceFormValidation(prev => ({
        ...prev,
        HSN: !!value
    }));
};


    const onBlur = (event) => {
        const { value = ""} = event.target;
        const index = HSNLIst.findIndex(item => item.label === value);
        const payload = {
            label: value
        }
        if (index === -1 && value) {
            postHsnCodeConnect(payload)
            .then(async(res) => {
                await getHsnCodeListConnect()
                showToast({
                    type: "success",
                    text: `HSN ${value} Added`,
                });
            })
            .catch((err) => {
                console.error("Error saving HSN code:", err);
            });
        }
    }

    const deleteHSN = (item) => {
        deleteHsnCodeConnect({
            hsnId: item._id
        })
        .then(async() => {
            await getHsnCodeListConnect()
                showToast({
                    type: "info",
                    text: `HSN ${item.label} Deleted`,
                });
        })
        .catch((err) => console.error("Error deleting HSN code:", err))
    }

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
        });
        const updatedAsnQty = [...asnQty];
        updatedAsnQty.push(ASN_INITIAL_STATE);
        setAsnQty(updatedAsnQty);
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
        if (name === "sno" && value.length >=2 && selectedCompany === COMPANY_TYPE.ASHOK) {
            const matchedPoItem = poDetail.items.find(poItem => poItem.itemNo === value);
            setAsnQty((prev) => {
                const updatedAsnQty = [...prev];
                if (matchedPoItem) {
                    updatedAsnQty[index] = {
                        ...updatedAsnQty[index],
                        totalQty: matchedPoItem.totalQty,
                        qtyLeft: matchedPoItem.openQty,
                    };
                } else {
                    updatedAsnQty[index] = {
                        totalQty: 0,
                        qtyLeft: 0,
                    };
                }
                return updatedAsnQty;
            });
        }
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
            itemType: inputValue ? "manual" : parts[0],
            // ...(!invoiceId && {
                description,
            // }),
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
        const updatedAsnQty = [...asnQty];
        updatedItems.splice(index, 1);
        updatedAsnQty.splice(index, 1);
        setAsnQty(updatedAsnQty);
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                items: updatedItems
            }
        });
    }

    const copyItem = (index) => {
        const updatedItems = [...items];
        const newItem = { ...updatedItems[index] };
        updatedItems.push(newItem);
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
                                {
                                    input.type === "select" &&
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
                                }
                                {
                                    input.type === "autocomplete" &&
                                            <CustomAutocomplete
                                            freeSolo
                                            id={input.id}
                                            name={input.id}
                                            disableClearable={false}
                                            value={invoiceFormDetail[input.key]}
                                            onChange={(e, value) => onAutocompleteChange(e, value)}
                                            onInputChange={(e, value, reason) => onAutocompleteChange(e, value, reason)}
                                            options={HSNLIst || []}
                                            textFieldLabel={input.placeholder}
                                            onBlur={onBlur}
                                            error={!invoiceFormValidation[input.key]}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                                                        <span>{option.label}</span>
                                                        <ClearIcon
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // ⛔ prevent option selection
                                                                deleteHSN(option)
                                                            }}
                                                        />
                                                    </Box>
                                                </li>
                                            )}
                                        />
                                }
                                {
                                    input.type === "textField" &&
                                    <>
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
                                        {/* {
                                            input.span &&
                                            <a href=""  style={{fontSize: "9px",   color: "blue"}} onClick={(e) => e.preventDefault()}>
                                                {po}
                                            </a>
                                        } */}
                                    </>
                                }

                            </Grid>
                        );
                    })}
                </Grid>
                <div >
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
                                                                // padding: '8px 0'
                                                            }
                                                        }}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <>
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
                                                            // padding: '8px 0',
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }
                                                    }}
                                                    {...row.extraProps}
                                                />
                                                {
                                                    row.span && item["sno"].length >= 2 && selectedCompany === COMPANY_TYPE.ASHOK &&
                                                    <Typography variant="caption" display="block" color="secondary" style={{fontSize: "10px", marginTop: "5px"}} >
                                                        {
                                                            isFetchingPO ? <Skeleton variant="text"  animation="wave" /> :
                                                            `ASN Qty: ${asnQty?.[idx]?.totalQty} | Left: ${asnQty?.[idx]?.qtyLeft}`
                                                        }
                                                    </Typography>
                                                }
                                            </>
                                        )}
                                    </span>
                                ))}

                                {
                                    isMobileDevice()?
                                    <Button fullWidth color="error" variant="outlined"  onClick={() => deleteItem(idx)}>
                                            Delete
                                    </Button>
                                    :
                                    <Box display="flex" justifyContent="space-around" alignItems="center" width="100%" height="100%">
                                        {items.length <= 9 && <FileCopyIcon onClick={() => copyItem(idx)} sx={{height: "100%"}} color="primary" />}
                                        {items.length > 1 && <DeleteOutlinedIcon onClick={() => deleteItem(idx)} sx={{height: "100%"}} color="error" />}
                                    </Box>
                                }

                            </div>
                        ))}
                    </Items>
                </div>
                {
                    items.length <= 9 && (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button color="primary"  onClick={addItem} className="outlinedCustomBtn">
                                Add More Item
                            </Button>
                        </Box>
                    )
                }
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
