import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const SelectVendor = ({
    id,
    config,
    size,
    width = 200,
    value = "",
    selectedCompany = "",
    callback = () => {},
    allowPreset = false,
    disableClearable = false,
    ...rest
}) => {

    const { company } = useParams();
    const {vendorsList = []} = config;
    const [selectedVendor, setSelectedVendor] = useState(null)
    const filteredVendorList = vendorsList?.filter((vendor) => vendor.type === (company || selectedCompany));
    const vendorOptions = filteredVendorList;
    // const selectedVendor = vendorOptions.find(v => v.id === value) || null;

    React.useEffect(() => {
        if (allowPreset && vendorOptions.length === 1 && !id) {
            setSelectedVendor(vendorOptions[0])
            callback({target: {name: rest.name, value: vendorOptions[0].id}}, vendorOptions[0])
        }
    }, [allowPreset, vendorOptions.length, id])

    const onInputChange = (event, newValue) => {
        const updatedEvent = {
            target: {...rest}
        }
        setSelectedVendor(newValue)
        callback(updatedEvent, newValue)
    }

    return (
        <Autocomplete
            sx={{width: {xs: "100%", sm: width}, flexShrink: 0}}
            size={size}
            value={selectedVendor}
            options={vendorOptions}
            disableClearable={disableClearable}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) => option.id == value.id}
            onChange={(event, newValue) => {onInputChange(event,newValue)}}
            renderInput={(params) => (
                <TextField {...params}   label="Select Customer" />
            )}
        />
    )
}

export default SelectVendor;