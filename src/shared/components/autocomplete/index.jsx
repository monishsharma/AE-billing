import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function CustomAutocomplete({
    options = [],
    textFieldLabel = "",
    onBlur,
    disableClearable,
    ...rest
}) {
    return (
        <Autocomplete
        {...rest}
        disableClearable={disableClearable}
        options={options}
        fullWidth
        renderInput={(params) => <TextField {...params} onBlur={onBlur} {...rest} label={textFieldLabel} />}
        />
    );
}