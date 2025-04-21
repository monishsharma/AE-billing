import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import { COMPANY_TYPE } from "../../../constants/app-constant";

// Define the INPUTS array with each field's configuration
export const INPUTS = [
    {
        id: "customer",
        name: "customer",
        placeholder: "Customer",
        type: "select",
        key: "customer",
        component: Select,
        extraProps: {
            options: Object.keys(COMPANY_TYPE).map((type) => ({
                value: type,
                label: COMPANY_TYPE[type]
            }))
        }
    },
    {
        id: "VendorCode",
        name: "Vendor Code",
        placeholder: "Vendor Code",
        type: "textField",
        key: "vendorCode",
        component: TextField,
        extraProps: {
            disabled: true
        }
    },
    {
        id: "materialCode",
        name: "Material code",
        placeholder: "Material code",
        type: "textField",
        key: "materialCode",
        component: TextField,
        extraProps: {}
    },
];
