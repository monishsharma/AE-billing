import React from "react";
import { Box, Button } from "@mui/material";

const StepperButton = ({ handleNext = () => {}, index, steps, handleBack = () => {} }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
        {index === steps.length - 1 ? "Finish" : "Continue"}
      </Button>
      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
        Back
      </Button>
    </Box>
  );
};

export default StepperButton;
