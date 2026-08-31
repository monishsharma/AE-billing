import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';

const ClearInputAdorment = ({
    onClick,
    position = "end"
}) => {

    return (
        <InputAdornment
            position={position}
            sx={{
                cursor: 'pointer' ,
            }}
            onClick={onClick}
        >

            <ClearIcon  />
        </InputAdornment>
    )
}

export default ClearInputAdorment