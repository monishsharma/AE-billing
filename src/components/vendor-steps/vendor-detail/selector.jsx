import { Select, TextField } from "@mui/material";
import { COMPANY_TYPE, VENDOR_STEPS } from "../../../constants/app-constant";

export const INPUTS = [
    {
        id: "type",
        name: "type",
        placeholder: "Vendor Type",
        label: "Vendor Type",
        type: "select",
        key: "type",
        component: Select,
        stepName: VENDOR_STEPS.VENDOR_DETAIL,
        extraProps: {
            options: Object.values(COMPANY_TYPE).map(type => ({
                label: type,
                value: type
            }))
        },

    },
    {
        id: "name",
        name: "name",
        placeholder: "Vendor Name",
        type: "textField",
        key: "name",
        component: TextField,
        stepName: VENDOR_STEPS.VENDOR_DETAIL,
        extraProps: {
            capitalize: true
        }
    },

    {
        id: "label",
        name: "label",
        placeholder: "Label",
        type: "textField",
        key: "label",
        component: TextField,
        stepName: VENDOR_STEPS.VENDOR_DETAIL,
    },

    {
        id: "materialCode",
        name: "materialCode",
        placeholder: "Material Code",
        type: "textField",
        key: "materialCode",
        component: TextField,
        stepName: VENDOR_STEPS.VENDOR_DETAIL,
        preventValidation: true,
        extraProps: {
                capitalize: true
            }
        },
    {
        id: "vendorCode",
        name: "vendorCode",
        placeholder: "Vendor Code",
        type: "textField",
        key: "vendorCode",
        component: TextField,
        stepName: VENDOR_STEPS.VENDOR_DETAIL,
        extraProps: {
            capitalize: true
        }
     }
];

export const NO_VALIDATON_INPUTS = ["materialCode"];