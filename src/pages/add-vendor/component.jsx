import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, TextField } from '@mui/material'
import React, { useState } from 'react';
import {createInitialValue, createInitialValueValidation, getStateInfo, INPUTS, intialState} from "./selector";
import styles from "./style.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PageLoader from '../../components/page-loader';
import { useNavigate, useParams } from 'react-router-dom';
import {isMobileDevice} from "../../helpers/is-mobile-device";


const AddVendor = ({config = {}, updateVendorListConnect, getVendorConnect, getVendorListConnect}) => {

    const { id } = useParams();

    const navigate = useNavigate();


    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const {vendorsList} = config;

    const [isLoading, setIsLoading] = useState(false);

    const [isProductRateRequired, setIsProductRateRequired] = useState(true);

    const validForValidation = ["name", "address", "GSTIN", "PAN", "vendorCode"]

    const [newVendorList, setNewVendorList] = useState({
        name: "",
        address: "",
        city: "",
        GSTIN: "",
        PAN: "",
        materialCode: "",
        vendorCode: "",
        label: ""
    });


    const [newVendorListValidation, setNewVendorListValidation] = useState({
        name: true,
        address: true,
        city: true,
        GSTIN: true,
        PAN: true
    });

    const [rows, setRows] = useState([createInitialValue()]);

    const [rowsValidation, setRowsValidation] = useState([createInitialValueValidation()]);

    const resetAll = () => {
        setNewVendorList({
            name: "",
            address: "",
            GSTIN: "",
            city: "",
            PAN: "",
            materialCode: "",
            vendorCode: ""
        });

        setNewVendorListValidation({
            name: true,
            address: true,
            city: "",
            GSTIN: true,
            PAN: true,
            vendorCode: true
        });

        setRows([createInitialValue()]);
        setRowsValidation([createInitialValueValidation()]);
    };

    React.useEffect(() => {
        if (id) {
            setIsLoading(true);
            getVendorConnect(id)
            .then((res) => {
                const selectedVendor = res.vendors[0];
                const {supplyRate, isProductRateRequired = true,  ...rest} = selectedVendor;
                setNewVendorList({
                    ...rest
                })
                setIsProductRateRequired(isProductRateRequired)
                setRows(supplyRate || [createInitialValue()]);
                setIsLoading(false);
            })
            .catch(() => {
                resetAll();
                setIsLoading(false);
            })
        }

    }, [id])
    React.useEffect(() => {
        if (rows.length !== rowsValidation.length) {
            setRowsValidation(rows.map(() => createInitialValueValidation()));
        }
    }, [rows.length]);
    // Plot no 1 Survey No96-14-115-116, Bashettyhlli,Village, Kasaba Hobli, Doddaballapur Talik, Banglore, Karantaka - 561203
    React.useEffect(() => {
        if (newVendorList.PAN && vendorsList.length && !id) {
            const sameVendor = vendorsList.filter(vendor => vendor.PAN == newVendorList.PAN);
            if (sameVendor && sameVendor[0]) {
                setRows(sameVendor[0].supplyRate);
            }
        }
    }, [newVendorList.PAN, vendorsList.length, id])



    const validateAllRows = (itemsValidation) => {
        const updatedValidation = itemsValidation.map((validationObj) => {
            return Object.keys(validationObj).reduce((acc, key) => {
                if (key === "description") {
                    acc[key] = true;
                } else {
                    acc[key] = !!validationObj[key];
                }
                return acc;
            }, {});
        });

        setRowsValidation(updatedValidation);
        return updatedValidation;
    };


    const performValidation = () => {
        const updatedValidation = validForValidation.reduce((acc, key) => {
            if (key === "GSTIN") {
                acc[key] =  !!gstinRegex.test(newVendorList[key]?.toUpperCase())
            } else if (key === "vendorCode") {
                acc[key] = true
            } else {
                acc[key] = !!newVendorList[key];
            }
            return acc;
        }, {});

        setNewVendorListValidation(updatedValidation);
        return Object.values(updatedValidation).every(Boolean);
    };

    const onFieldchange = (event) => {
        const {name, value} = event.target;
        setNewVendorList({
            ...newVendorList,
            [name]: value
        });
        if (name === "GSTIN") {
            if (gstinRegex.test(value.toUpperCase())) {
                const PAN = gstinRegex.test(value.toUpperCase()) ?  value.substring(2, 12) : "";
                setNewVendorList({
                    ...newVendorList,
                    "PAN": PAN,
                    [name]: value.toUpperCase()
                });
            } else {
                setNewVendorList({
                    ...newVendorList,
                    "PAN": "",
                    [name]: value.toUpperCase()
                });
            }

        } else {
            setNewVendorList({
                ...newVendorList,
                [name]: value
            });
        }
        setNewVendorListValidation({
            ...newVendorListValidation,
            ...(name === "GSTIN" ? {
                [name]: gstinRegex.test(value.toUpperCase())
            } : {
                [name]: value
            })
        });
    }

    const addItem = () => {
        setRows([
            ...rows,
            createInitialValue()
        ])

    }

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    }

    const onItemChange = (event, index) => {
        const {target: {value, name}} = event;
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [name]: value
        };
        setRows(updatedRows)
    }

    const saveVendor = async() => {
        let vendorListCopy = [...vendorsList];
        const isInvoiceValid = performValidation();
        const validationResult = isProductRateRequired ?  validateAllRows(rows) : [true];
        const isItemsValid = validationResult.every(validationObj =>
            Object.values(validationObj).every(Boolean)
        );
        if (isInvoiceValid && isItemsValid) {
            setIsLoading(true);
            const {code, state} = getStateInfo(newVendorList.GSTIN)
            const payload = {
                ...newVendorList,
                stateCode: code,
                state: state,
                isProductRateRequired,
                value: newVendorList.name.toUpperCase().split(" ").join("_"),
                placeholder: newVendorList.name.toUpperCase(),
                type: code == 23 ? "ASHOK":"PADMA",
                ...(isProductRateRequired && {
                    supplyRate: [...rows],
                }),
                // id: uuidv4(),
                isInterState: parseInt(code) !== 23
            }
            const sameVendorList = vendorListCopy.filter((item) => item.PAN === newVendorList.PAN);
            if (sameVendorList.length) {
                vendorListCopy = vendorListCopy.map((vendor) => {
                    if (vendor.PAN === newVendorList.PAN) {
                        return {
                            ...vendor,
                            ...(isProductRateRequired && {
                                supplyRate: [...rows],
                            }),
                        };
                    }
                    return vendor;
                });
            }
            if (!id) {
                vendorListCopy.push(payload)
            }
            const index = vendorListCopy.findIndex(vendor => vendor.id === id);
            if (index !== -1) {
                vendorListCopy[index] = {
                    ...payload
                }
            }

            updateVendorListConnect(vendorListCopy)
            .then(async() => {
                await getVendorListConnect();
                navigate("/vendors", { replace: true });
                resetAll();
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
        }

    }


    if (isLoading) return <PageLoader />

    return (
        <div>
            <div className="mt-4">
                <h2 className="fw-bold">Add Vendor</h2>
                <div className="mt-4">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid  size={{md: 5, xs: 12}}>
                        <h6 className="fw-bold mt-4 mb-4">Vendor Detail</h6>
                            <Stack spacing={2}>
                                {
                                    INPUTS.map((input, index) => {
                                        const Component = input.component;
                                        return (
                                            <Component
                                                key={index}
                                                {...input.extraProps}
                                                name={input.id}
                                                label={input.placeholder}
                                                variant='outlined'
                                                onChange={onFieldchange}
                                                value={newVendorList[input.key]}
                                                error={validForValidation.includes(input.key) && newVendorListValidation[input.key] === false}
                                                fullWidth
                                            />
                                        )
                                    })
                                }
                            </Stack>
                        </Grid>
                        <Grid size={{md: 7, xs: 12}}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fw-bold mt-4 mb-4">Product Rate</h6>
                                </div>
                                {isProductRateRequired && <div>
                                    <Button onClick={addItem}>Add Item</Button>
                                </div>}
                            </div>

                            {
                                rows.length === 1 &&
                                <div className="mb-2">
                                    <FormControlLabel control={<Checkbox checked={isProductRateRequired} />} label="Product Rate Required ?"  onChange={(event) => setIsProductRateRequired(event.target.checked)}/>
                                </div>
                            }

                            {
                                isProductRateRequired &&
                                <div className={styles.flexContainer}>
                                <div className={styles.gridContainer}>
                                    {
                                        !isMobileDevice() ?
                                        <>
                                            <span>Product Description</span>
                                            <span>Description</span>
                                            <span>Rate</span>
                                        </>
                                        :
                                        <span>Product Item Rate</span>
                                    }

                                </div>
                                <div >
                                    {
                                        rows.map((row, index) => (
                                            <div className={styles.itemsContainer} key={index}>
                                                {

                                                    intialState.map((item, itemIndex) => (
                                                        <span key={itemIndex}>
                                                            {
                                                                <TextField
                                                                    fullWidth
                                                                    id={item.label}
                                                                    label={item.label}
                                                                    name={item.key}
                                                                    value={row[item.key]}
                                                                    variant="standard"
                                                                    error={rowsValidation[index] && !rowsValidation[index][item.key]}
                                                                    onChange={(e) => onItemChange(e, index)}
                                                                    {...item.extraProps}
                                                                />
                                                            }
                                                        </span>
                                                    ))
                                                }
                                                {rows .length > 1 && <span className='mt-3' onClick={() => deleteRow(index)}>
                                                    {
                                                        isMobileDevice()?
                                                        <Button fullWidth color="error" variant="outlined"  onClick={addItem}>
                                                            Delete
                                                        </Button>
                                                        :
                                                        <DeleteOutlinedIcon color="error" />
                                                    }
                                                </span>}
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                            }
                        </Grid>
                    </Grid>
                    <div className='mt-4'>
                        <Button variant="contained" onClick={() => saveVendor()}>
                            Save Changes
                        </Button>
                    </div>
                </Box>
                </div>
            </div>
        </div>
    )
}

export default AddVendor