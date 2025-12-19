import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const StepperButton = ({ handleNext = () => {}, index, steps, handleBack = () => {} }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }} className="customBtn">
        {index === steps.length - 1 ? "Finish" : "Continue"}
      </Button>
      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }} className="outlinedCustomBtn">
        Back
      </Button>
    </Box>
  );
};

export default StepperButton;
