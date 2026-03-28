import React from 'react';
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { FILTER } from './selector,js';
import { IconButton } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";

const RollerFilter = ({
    value,
    size = "small",
    defaultStatus,
    options = FILTER,
    onChange = () => {},
    onClear = () => {}
}) => {

    return (
        <Box >
            <Select
                sx={{
                    flexShrink: 0,
                    width: 250,
                }}
                size={size}
                value={value}
                // defaultValue={defaultStatus?.value}
                onChange={onChange}
                displayEmpty
                endAdornment={
                value && (
                    <IconButton

                    size="small"
                    onClick={(e) => {
                        e.stopPropagation(); // VERY important
                        onClear();
                    }}
                    sx={{ mr: 3 }} // spacing from dropdown arrow
                    >
                    <ClearIcon fontSize="small" />
                    </IconButton>
                )
                }
                renderValue={(selectedValue) => {

                    if (!selectedValue) {
                        return (
                        <Typography color="text.secondary">
                            Select Roller Size
                        </Typography>
                        );
                    }

                    const item =  options.find((s) => s.value == selectedValue);
                    return (
                        <Box display="flex" alignItems="center" >
                            {item.label}
                        </Box>
                    );
                }}
            >
                {/* <MenuItem disabled value="">
                    Select status
                </MenuItem> */}
                {
                    options.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                            <Box display="flex" alignItems="center">
                                {status.label}
                            </Box>
                        </MenuItem>
                ))}

            </Select>
        </Box>
    )
}

export default RollerFilter;