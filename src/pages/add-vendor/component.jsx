import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react';
import {createInitialValue, createInitialValueValidation, getStateInfo, INPUTS, intialState} from "./selector";
import styles from "./style.module.css"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PageLoader from '../../components/page-loader';
import { useNavigate, useParams } from 'react-router-dom';
import {isMobileDevice} from "../../helpers/is-mobile-device";
import AddVendorV2 from '../add-vendor-v2';


const AddVendor = ({config = {}, updateVendorListConnect, getVendorConnect, getVendorListConnect}) => {

    const { id } = useParams();

    React.useEffect(() => {
        if (id) {
            getVendorConnect(id)
            .then((res) => {
                const priorityTypes = ["LPT", "Pauwels", "Channel"];
                const selectedVendor = res.vendors[0];
                const {supplyRate, isProductRateRequired = true,  ...rest} = selectedVendor;
                const orderedSupplyRate = supplyRate ? supplyRate.sort((a, b) => {
                    const aIsPriority = priorityTypes.includes(a.type);
                    const bIsPriority = priorityTypes.includes(b.type);

                    // 1. Priority items at top
                    if (aIsPriority && !bIsPriority) return -1;
                    if (!aIsPriority && bIsPriority) return 1;

                    // 2. If both are rollers → sort by size
                    if (a.code === "ROLLER" && b.code === "ROLLER") {
                        return (b.size || 0) - (a.size || 0);
                    }

                    // 3. Keep rest as-is
                    return 0;
                }) : [];
                setNewVendorList({
                    ...rest
                })
                setIsProductRateRequired(isProductRateRequired)
                setRows(orderedSupplyRate || [createInitialValue()]);
            })
            .catch(() => {
            })
        }

    }, [id])
    return <AddVendorV2 />;
}

export default AddVendor