import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import { COMPANY_TYPE } from "../../../constants/app-constant";


// Define the INPUTS array with each field's configuration
export const INPUTS = [
    {
        id: "company",
        name: "Company",
        placeholder: "Company",
        type: "select",
        key: "company",
        component: Select,
        extraProps: {
            disableOnEdit: true,
            options: Object.keys(COMPANY_TYPE).map((type) => ({
                value: COMPANY_TYPE[type],
                label: COMPANY_TYPE[type]
            }))
        }
    },
    {
        id: "invoiceNO",
        name: "Invoice No",
        placeholder: "Invoice No",
        type: "textField",
        key: "invoiceNO",
        component: TextField,
        extraProps: {
            disableOnEdit: true
        },
        description: true
    },
    {
        id: "invoiceDate",
        name: "Invoice Date",
        placeholder: "Invoice Date",
        type: "textField",
        key: "invoiceDate",
        component: TextField,
        extraProps: {
            type: "date",
            slotProps: {
                inputLabel: {
                    shrink: true
                },
            },
        },
    }
];
