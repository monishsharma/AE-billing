import TextField from '@mui/material/TextField';

// Define the INPUTS array with each field's configuration
export const INPUTS = [

    {
        id: "vehicleNo",
        name: "Vehicle No",
        placeholder: "Vehicle No",
        type: "textField",
        key: "vehicleNo",
        component: TextField
    },
    {
        id: "eway",
        name: "Eway Bill No",
        placeholder: "Eway Bill No",
        type: "textField",
        key: "eway",
        component: TextField,
        extraProps: {}
    },
];
