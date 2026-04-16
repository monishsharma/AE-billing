import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import SelectVendor from "../../select-vendor"
import { COMPANY_TYPE } from "../../../constants/app-constant";

// Define the INPUTS array with each field's configuration

export const orderTypeOptions = [
                { value: "Roller", label: "Roller", vCode: "280000052" },
                { value: "Frame", label: "Frame", vCode: "283051012" },
                { value: "Bakelite", label: "Bakelite", vCode: "320007177" },
                { value: "Others", label: "Others", vCode: "" },
]
export const INPUTS = [
    {
        id: "customer",
        name: "customer",
        placeholder: "Customer",
        type: "textField",
        key: "customer",
        component: SelectVendor,
        extraProps: {
            disabledOnEdit: true,
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
            disabledOnEdit: true
        }
    },
    {
        id: "orderType",
        name: "orderType",
        placeholder: "Order Type",
        type: "select",
        key: "orderType",
        component: Select,
        extraProps: {
            disabledOnEdit: true,
            options: [
                ...orderTypeOptions
            ]
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
    }
];

