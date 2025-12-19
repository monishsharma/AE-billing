import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import { COMPANY_TYPE } from "../../../constants/app-constant";

// Define the INPUTS array with each field's configuration

export const orderTypeOptions = [
                { value: "Roller", label: "Roller", vCode: "280000052" },
                { value: "Frame", label: "Frame", vCode: "283051012" },
                { value: "Bakelite", label: "Bakelite", vCode: "320007177" },
                { value: "Other", label: "Other", vCode: "" },
]
export const INPUTS = [
    {
        id: "customer",
        name: "customer",
        placeholder: "Customer",
        type: "select",
        key: "customer",
        component: Select,
        extraProps: {
            disabledOnEdit: true,
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

export const getCustomerDetail = ({
    selectedCustomer,
    ...rest
}) => {
    const materialCode = rest.materialCode || selectedCustomer.materialCode || "";
    const orderType = rest.orderType || selectedCustomer.orderType || "";
    const {
        id,
        address,
        isInterState,
        vendorCode,
        GSTIN,
        PAN,
        name,
        type,
        state,
        city,
    } = selectedCustomer;

    return {
            materialCode,
            orderType,
            customer: id,
            customerName: selectedCustomer.label,
            address,
            isInterState,
            vendorCode,
            GSTIN,
            PAN,
            name,
            type,
            city,
            state,

    }
}