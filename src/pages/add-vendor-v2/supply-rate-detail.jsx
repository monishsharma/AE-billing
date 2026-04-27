import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from "./style.module.css"
import { createInitialValue, intialState } from './selector'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { isMobileDevice } from '../../helpers/is-mobile-device'



const SupplyRateDetail = () => {

    const [productRateRows, setproductRateRows] = React.useState([createInitialValue()]);

    const addRow = () => {
        const newRow = createInitialValue();
        const updatedRows = [...productRateRows, newRow];
        setproductRateRows(updatedRows);
    }

     const deleteRow = ({ index }) => {
        const row = productRateRows;
        const updatedRows = row.filter((_, idx) => idx !== index);
        setproductRateRows(updatedRows);
    }


    return (
        <>
            <Box >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <h6 className="fw-bold mt-4 mb-4">Product Rate</h6>
                    <Button variant='text' size='small' onClick={() => addRow()}>
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
                                                        item.type === "select" ?
                                                        <FormControl fullWidth key={itemIndex} sx={{width: "100%"}}>
                                                        <InputLabel id={`${item.id}-label`}>{item.placeholder}</InputLabel>
                                                            <Select
                                                                fullWidth
                                                                id={item.id}
                                                                labelId={`${item.id}-label`}
                                                                name={item.id}
                                                                variant='standard'
                                                                label={item.placeholder}
                                                                // value={quotation?.[item.stepName]?.[item.name] || ""}
                                                                placeholder={item.placeholder}
                                                                onChange={(event) => onFieldChange({ event, index, name: item.name })}
                                                                // error={!quotationFormValidation[item.key]}
                                                                // disabled={item.extraProps && item.extraProps.disableOnEdit && id}
                                                                {...item.extraProps}
                                                            >
                                                                {
                                                                    item.extraProps.options.map((opt) => (
                                                                        <MenuItem key={opt.value} value={opt.value} >
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
                                                                // value={row[item.key]}
                                                                variant="standard"
                                                            // error={rowsValidation[index] && !rowsValidation[index][item.key]}
                                                            // onChange={(e) => onItemChange(e, index)}
                                                            />
                                                    }
                                                </span>
                                        ))
                                    }
                                    {productRateRows.length > 1 && <span className='mt-2' >
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
        </>
    )
}

SupplyRateDetail.propTypes = {}

export default SupplyRateDetail