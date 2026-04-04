import React from 'react';
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const StatusFilter = ({
    size,
    defaultStatus,
    options,
    width = 200,
    onchange = () => {}
}) => {


    return (
        <Select
            sx={{
                flexShrink: 0,
                width: {
                    xs: "100%",
                    sm: width
                },
            }}
            size={size}
            defaultValue={defaultStatus.value}
            onChange={onchange}
            displayEmpty
            renderValue={(selectedValue) => {
                if (!selectedValue) {
                    return (
                    <Typography color="text.secondary">
                        Select status
                    </Typography>
                    );
                }

                const item =  options.find((s) => s.value === selectedValue);

                return (
                    <Box display="flex" alignItems="center" gap={1}>
                    {/* Color circle */}
                        <Box
                            sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            }}
                        />
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
                    <MenuItem key={status.key} value={status.value}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    backgroundColor: status.color,
                                }}
                            />
                            {status.label}
                        </Box>
                    </MenuItem>
            ))}

        </Select>
    )
}

export default StatusFilter;