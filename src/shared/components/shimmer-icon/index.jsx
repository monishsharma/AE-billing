import React from "react";

const PulseIcon = ({
  icon: Icon,
  color,
  size = 22,
}) => {
  return (
    <Icon
      sx={{
        fontSize: size,
        color,

        animation: "iconPulse 1.8s infinite",

        "@keyframes iconPulse": {
          "0%": {
            filter: `drop-shadow(0 0 0 currentColor)`,
          },

          "70%": {
            filter: `drop-shadow(0 0 6px currentColor)`,
          },

          "100%": {
            filter: `drop-shadow(0 0 0 transparent)`,
          },
        },
      }}
    />
  );
};

export default PulseIcon;