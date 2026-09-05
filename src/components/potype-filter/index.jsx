import React from "react";
import { Box, Button } from "@mui/material";
import { FILTER_OPTION } from "../../constants/app-constant";

const PoTypeFilter = ({
  options = FILTER_OPTION,
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
        gap: "6px",
        width: "100%"
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
            flexGrow: { xs: 1, sm: 1, md: 0 },
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