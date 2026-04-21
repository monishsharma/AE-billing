import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { createInitialValue, createPlantDetailInitialValue, INPUTS, intialState, PLANT_DETAIL_INPUTS } from './selector';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {isMobileDevice} from '../../helpers/is-mobile-device'
import IconButton from '@mui/material/IconButton';
import styles from "./style.module.css"


const AddVendorV2 = () => {

    const [vendorPlantDetailRows, setVendorPlantDetailRows] = React.useState([createPlantDetailInitialValue()]);
    const [productRateRows, setproductRateRows] = React.useState([createInitialValue()]);

    const addRow = ({rowForPlant}) => {
        const newRow = rowForPlant ? createPlantDetailInitialValue() : createInitialValue();
        const updatedRows = rowForPlant ? [...vendorPlantDetailRows, newRow] : [...productRateRows, newRow];
        rowForPlant ? setVendorPlantDetailRows(updatedRows) : setproductRateRows(updatedRows);
    }

    const deleteRow = ({rowForPlant, index}) => {
        const row = rowForPlant ? vendorPlantDetailRows : productRateRows;
        const updatedRows = row.filter((_, idx) => idx !== index);
        rowForPlant ? setVendorPlantDetailRows(updatedRows) : setproductRateRows(updatedRows);
    }

    const onFieldChange = ({event, rowIndex}) => {
        const { name, value } = event.target;
        // setVendorFormData((prevData) => ({
        }

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
                            <h6 className="fw-bold mt-4 mb-4">Vendor Detail</h6>
                            <Grid container spacing={2}>
                                {
                                    INPUTS.map((input, index) => {
                                        const Component = input.component;
                                        const options = input.extraProps?.options;
                                        return (
                                            <Grid  size={{md: 4, xs: 12}} key={index}>
                                                <Component
                                                    fullWidth
                                                    id={input.id}
                                                    name={input.name}
                                                    label={input.placeholder}
                                                    // value={quotation?.[input.stepName]?.[input.name] || ""}
                                                    placeholder={input.placeholder}
                                                    onChange={(event) => onFieldChange({event})}
                                                    type={input.extraProps?.type || "text"}
                                                    // error={!quotationFormValidation[input.key]}
                                                    // disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                                    {...input.extraProps}
                                                >
                                                    {
                                                        options?.map((opt) => (
                                                            <MenuItem key={opt.value} value={opt.value} >
                                                                {opt.label}
                                                            </MenuItem>
                                                    ))}
                                                </Component>
                                                </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 4
                                }}
                            >
                                <h6 className="fw-bold mt-4 mb-4">Plant Detail</h6>
                                <Button variant='text' size='small' onClick={() => addRow({rowForPlant: true})}>
                                    Add plant
                                </Button>
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                        {
                                            vendorPlantDetailRows.map((row, index) => {
                                                return (
                                                    <Grid key={index} container spacing={2} alignItems="center" mb={2}>
                                                        {
                                                            PLANT_DETAIL_INPUTS.map((input, inputIDX) => {
                                                                const Component = input.component;
                                                                return (
                                                                    <Grid  size={{md: 3.4, xs: 12}} key={inputIDX}>
                                                                        <Component
                                                                            fullWidth
                                                                            id={input.id}
                                                                            name={input.name}
                                                                            // labelId={`${input.id}-label`}
                                                                            label={input.placeholder}
                                                                            // value={quotation?.[input.stepName]?.[input.name] || ""}
                                                                            placeholder={input.placeholder}
                                                                            // onChange={(event) => onFieldChange({event, stepName: input.stepName})}
                                                                            type={input.extraProps?.type || "text"}
                                                                            // error={!quotationFormValidation[input.key]}
                                                                            // disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                                                                            {...input.extraProps}
                                                                        />
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                        {vendorPlantDetailRows.length > 1 && (
                                                            <Grid justifyContent={"flex-end"} width={{md: "auto", xs: "100%"}} >
                                                                {
                                                                    isMobileDevice()?
                                                                    <Button fullWidth color="error" variant="outlined"  onClick={() => deleteRow({rowForPlant: true, index})}>
                                                                        Delete
                                                                    </Button>
                                                                    :
                                                                    <DeleteOutlinedIcon color="error" onClick={() => deleteRow({rowForPlant: true, index})} />
                                                                }
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                )
                                            })
                                        }
                            </Box>
                            <Box sx={{
                                mb: 4
                            }}>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 4
                                }}
                            >
                                <h6 className="fw-bold mt-4 mb-4">Product Rate</h6>
                                <Button variant='text' size='small' onClick={() => addRow({rowForPlant: false})}>
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
                                            </>
                                            :
                                            <span>Product Item Rate</span>
                                        }

                                    </div>

                                    {
                                        productRateRows.map((row, index) => (
                                            <div className={styles.itemsContainer} key={index}>
                                                {

                                                    intialState.map((item, itemIndex) => (
                                                        <span key={itemIndex}>
                                                            {
                                                                <TextField
                                                                    fullWidth
                                                                    multiline
                                                                    id={item.label}
                                                                    label={item.label}
                                                                    name={item.key}
                                                                    // value={row[item.key]}
                                                                    variant="standard"
                                                                    // error={rowsValidation[index] && !rowsValidation[index][item.key]}
                                                                    // onChange={(e) => onItemChange(e, index)}
                                                                />
                                                            }
                                                        </span>
                                                    ))
                                                }
                                                {productRateRows .length > 1 && <span className='mt-3' >
                                                    {
                                                        isMobileDevice()?
                                                        <Button fullWidth color="error" variant="outlined" onClick={() => deleteRow({rowForPlant: false, index})}>
                                                            Delete
                                                        </Button>
                                                        :
                                                        <DeleteOutlinedIcon color="error" onClick={() => deleteRow({rowForPlant: false, index})} />
                                                    }
                                                </span>}
                                            </div>

                                        ))
                                    }
                                </div>
                            }
                            </Box>
                            <div className='mt-4'>
                                <Button variant="contained" onClick={() => saveVendor()} className='customBtn'>
                                    Save Changes
                                </Button>
                            </div>
                        </Box>
                    </div>
                </div>
        </div>
    )
}

export default AddVendorV2