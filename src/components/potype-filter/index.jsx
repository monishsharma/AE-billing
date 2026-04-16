import React from "react";
import { Box, Button } from "@mui/material";

const PoTypeFilter = ({
  options = [],
  selected,
  onChange,
  classNameActive = "customBtn",
  classNameInactive = "outlinedCustomBtn"
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        gap: "6px"
      }}
    >
      {options.map((option) => (
        <Button
          key={option.id}
          className={
            selected?.id === option.id
              ? classNameActive
              : classNameInactive
          }
          onClick={() => onChange(option)}
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            flexBasis: { xs: "48%", sm: "auto" },
            minWidth: "100px",
            fontSize: { xs: "11px" }
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
};

export default PoTypeFilter;