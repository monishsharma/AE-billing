import { Box, Button, Grid } from '@mui/material';
import React from 'react'
import { createPlantDetailInitialValue, PLANT_DETAIL_INPUTS } from './selector';
import { isMobileDevice } from '../../helpers/is-mobile-device';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const PlantDetails = ({
}) => {

    const [vendorPlantDetailRows, setVendorPlantDetailRows] = React.useState([createPlantDetailInitialValue()]);

    const addRow = () => {
        const newRow = createPlantDetailInitialValue()
        const updatedRows =[...vendorPlantDetailRows, newRow];
       setVendorPlantDetailRows(updatedRows);
    }

    const deleteRow = ({ index }) => {
        const row =  vendorPlantDetailRows;
        const updatedRows = row.filter((_, idx) => idx !== index);
         setVendorPlantDetailRows(updatedRows);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
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
                                            <Button fullWidth color="error" variant="outlined"  onClick={() => deleteRow({index})}>
                                                Delete
                                            </Button>
                                            :
                                            <DeleteOutlinedIcon color="error" onClick={() => deleteRow({index})} />
                                        }
                                    </Grid>
                                )}
                            </Grid>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default PlantDetails