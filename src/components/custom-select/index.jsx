import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

const CustomSelect = ({
    id,
    placeholder,
    validation,
    value,
    variant,
    onChange,
    children,
    ...rest
}) => {
    return (
        <FormControl fullWidth error={!validation} variant={variant}>
            <InputLabel id={`${id}-label`}>{placeholder}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                name={id}
                label={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
            >
                {children}
            </Select>
            {!validation && (
                <p style={{ color: 'red', fontSize: '12px', margin: "3px 0 0 14px" }}>
                    {placeholder} is required
                </p>
            )}
        </FormControl>
    )
}

export default CustomSelect;