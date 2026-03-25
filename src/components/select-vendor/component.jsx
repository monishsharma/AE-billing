import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react'
import { useParams } from 'react-router-dom';

const SelectVendor = ({
    config,
    size,
    callback = () => {}
}) => {

    const { company } = useParams();
    const {vendorsList = []} = config;
    const filteredVendorList = vendorsList?.filter((vendor) => vendor.type === company);
    const vendorOptions = filteredVendorList;

    const onInputChange = (event, newValue) => {
        callback(newValue)
    }

    return (
        <Autocomplete
            sx={{width: 200, flexShrink: 0}}
            size={size}
            options={vendorOptions}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {onInputChange(event,newValue)}}
            renderInput={(params) => (
                <TextField {...params} label="Select Customer" />
            )}
        />
    )
}

export default SelectVendor;