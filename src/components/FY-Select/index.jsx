import React, { useMemo, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";



const formatFY = (startYear) => {
  const endYear = String(startYear + 1).slice(-2);
  return `${startYear}-${endYear}`;
};

const FYSelect = ({ onChange, value, setValue,}) => {
  const currentFY = value;


  const fyOptions = useMemo(() => {
    const years = [];

    // 1 previous FY
    years.push(currentFY - 1);

    // current + 4 future
    for (let i = 0; i <= 4; i++) {
      years.push(currentFY + i);
    }

    return years;
  }, [currentFY]);


  const handleChange = (e) => {
    const fy = Number(e.target.value);
    setValue(fy);

    // optional: send to parent
    if (onChange) onChange(fy);
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="fy-label">Financial Year</InputLabel>
      <Select
        labelId="fy-label"
        value={value}
        label="Financial Year"
        onChange={handleChange}
      >
        {fyOptions.map((year) => (
          <MenuItem key={year} value={year}>
            {formatFY(year)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FYSelect;