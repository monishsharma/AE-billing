import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import ItemModal from '../item-modal';



const modalInput = [
    {
        label: "Customer Name",
        key: "value"
    },
    {
        label: "Customer Branch",
        key: "branch"
    }
]
const SelectVendor = ({
    id,
    config,
    size,
    width = 200,
    value = "",
    disabled = false,
    allowTempCustomer = false,
    selectedCustomer,
    selectedCompany = "",
    callback = () => {},
    allowPreset = false,
    disableClearable = false,
    ...rest
}) => {

    const { company } = useParams();
    const {vendorsList = []} = config;
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedVendor, setSelectedVendor] = useState(selectedCustomer || {})
    const [addTempCustomerModal, setAddTempCustomerModal] = useState(false);

    const filteredVendorList = vendorsList?.filter((vendor) => vendor.type === (company || selectedCompany));

    const TEMP_VENDOR = {
        id: "temp",
        label: selectedVendor?.label || "+ Add Temp Customer",
        isTemporary: true
    };

    const vendorOptions = [
        ...(allowTempCustomer ? [TEMP_VENDOR] : []),
        ...filteredVendorList.map(v => ({
            ...v,
            id: v.id || v._id
        }))
    ]

    const selectedVendorValue = vendorOptions.find(v => v.id == value) || selectedVendor || null;
    // React.useEffect(() => {
    //     setSelectedVendor(selectedCustomer || null)
    // }, [selectedCustomer])

    React.useEffect(() => {
        if (allowPreset && vendorOptions.length === 1 && !id) {
            setSelectedVendor(vendorOptions[0])
            callback({target: {name: rest.name, value: vendorOptions[0].id}}, vendorOptions[0])
        }
    }, [allowPreset, vendorOptions.length, id])

    const onInputChange = (event, newValue) => {
        if (newValue?.isTemporary) {
            setAddTempCustomerModal(true);
            return;
        }
        const updatedEvent = {
            target: {...rest}
        }
        setSelectedVendor(newValue)
        callback(updatedEvent, newValue)
    }

    const toggleModal = () => {
        setAddTempCustomerModal(!addTempCustomerModal);
    }

    const onSaveHandler = (selectedItem) => {
        const updatedSelectedItem = {
            id: "temp",
            value: selectedItem.value,
            branch: selectedItem.branch,
            label: selectedItem.value,
            isTemporary: true
        }
        const updatedEvent = {
            target: {...rest, updatedSelectedItem}
        }
        setSelectedVendor(updatedSelectedItem)
        callback(updatedEvent, updatedSelectedItem)
        toggleModal();
    }

    return (
        <>
            <ItemModal
                title={"Add Temp Customer"}
                open={addTempCustomerModal}
                INPUT={modalInput}
                flexDirection="row"
                onSave={onSaveHandler}
                toggleModal={toggleModal}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <Autocomplete
                sx={{width: {xs: "100%", sm: width}, flexShrink: 0}}
                size={size}
                disabled={disabled}
                value={selectedVendorValue}
                options={vendorOptions}
                // disableClearable={disableClearable}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) => option?.id == value?.id}
                onChange={(event, newValue) => {onInputChange(event,newValue)}}
                renderInput={(params) => (
                    <TextField {...params}   label="Select Customer" />
                )}
               renderOption={({key, ...props}, option) => {
                    if (option.isTemporary) {
                        return (
                            <li
                                {...props}
                                key={key}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setAddTempCustomerModal(true);
                                }}
                            >
                                <Button size="small" sx={{ fontSize: '12px', textTransform: 'none' }}>
                                    + Add Temp Customer
                                </Button>
                            </li>
                        );
                    }

                    return (
                        <li  {...props}>
                            {option.label}
                        </li>
                    );
                }}
            />
        </>
    )
}

export default SelectVendor;