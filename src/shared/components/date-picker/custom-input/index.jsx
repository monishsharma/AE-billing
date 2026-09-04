import { Button } from '@mui/material';
import React from 'react';
import { forwardRef } from 'react';
import ReactDatePicker from "react-datepicker";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="d-flex ">
            <Button
                fullWidth
                sx={{minWidth: 150}}
                onClick={onClick}
                size="medium"
                ref={ref}
                className="outlinedCustomBtn"
            >
                {value}
            </Button>
        </div>
));




const DatePicker = ({
    selected,
    onChange,
    dateFormat,
    withPortal=false,
    customInput=false,
    showMonthYearPicker
}) => {

    return (
        <ReactDatePicker
            selected={selected}
            showMonthYearPicker={showMonthYearPicker}
            dateFormat={dateFormat}
            onChange={onChange}
            withPortal={withPortal}
            {...(customInput) && {
                customInput: <ExampleCustomInput />
            }}
        />
    )
}

export default DatePicker