import { Select, TextField } from "@mui/material";
import { VENDOR_STEPS, gstinStateCodes } from "../../../constants/app-constant";

export const PLANT_DETAIL_INPUTS = [
    {
        id: "GSTIN",
        name: "GSTIN",
        placeholder: "GSTIN",
        type: "textField",
        key: "GSTIN",
        component: TextField,
        stepName: VENDOR_STEPS.PLANT_DETAIL,
        extraProps: {
            capitalize: true
        }
    },
    {
        id: "PAN",
        name: "PAN",
        placeholder: "PAN",
        type: "textField",
        key: "PAN",
        component: TextField,
        stepName: VENDOR_STEPS.PLANT_DETAIL,
        extraProps: {
            disabled: true,
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
        stepName: VENDOR_STEPS.PLANT_DETAIL
    },
    {
        id: "address",
        name: "address",
        placeholder: "Address",
        type: "textField",
        key: "address",
        component: TextField,
        stepName: VENDOR_STEPS.PLANT_DETAIL
    },
    {
        id: "city",
        name: "city",
        placeholder: "Distict/City",
        type: "textField",
        key: "city",
        component: TextField,
        stepName: VENDOR_STEPS.PLANT_DETAIL
    },
    {
        id: "state",
        name: "state",
        placeholder: "State",
        type: "textField",
        key: "state",
        component: TextField,
        stepName: VENDOR_STEPS.PLANT_DETAIL,
        extraProps: {
            disabled: true
        }
    },

];

export const createPlantDetailInitialValue = () => {
    return PLANT_DETAIL_INPUTS.reduce((acc, item) => {
        acc[item.key] = "";
        return acc;
    }, {});
}