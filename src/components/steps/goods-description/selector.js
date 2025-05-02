import { Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import {isMobileDevice} from "../../../helpers/is-mobile-device"

// Define the INPUTS array with each field's configuration
export const INPUTS = [
    {
        id: "po",
        name: "Purchase Order No",
        placeholder: "Purchase Order No",
        type: "textField",
        key: "po",
        component: TextField
    },
    {
        id: "serial",
        name: "Serial No",
        placeholder: "Serial No",
        type: "textField",
        key: "serial",
        component: TextField
    },
    {
        id: "HSN",
        name: "HSN Code",
        placeholder: "HSN Code",
        key: "HSN",
        type: "select",
        component: TextField
    }
];


export const initialState = [
    {
        label: "S no",
        key: "sno",
        intialValue: "",
    },
    {
        label: "Description",
        key: "description",
        intialValue: "",
        extraProps: {
            multiline: true
        }
    },
    {
        label: "W.O/DRG",
        key: "wo",
        intialValue: ""
    },
    {
        label: "Qty/Kgs/Nos",
        key: "qty",
        intialValue: 0

    },
    {
        label: "Rate",
        key: "rate",
        intialValue: "",
        dropdown:true
    },
    {
        label: "Value",
        key: "value",
        intialValue: 0,
        extraProps: {
            // disabled: true
        }
    }
]

export const createInitialValue = () => {
    return initialState.reduce((acc, item) => {
        acc[item.key] = item.intialValue;
        return acc;
    }, {});
}

export const createInitialValueValidation = () => {
    return initialState.reduce((acc, item) => {
        acc[item.key] = true;
        return acc;
    }, {});
}

export const getTotalItems = (items) => {
    let totalItems = [];
    for(var i =0; i<items.length; i++) {
        totalItems.push(initialState.map(item => ({ ...item, value: items[i][item.key] })));
    }
    return totalItems;
}

export const columns = [
    {
        label: `${isMobileDevice() ? "Items" : "S.No"}`,
        class: ""
    },
    {
        label: "Description",
        class: true
    },
    {
        label: "W.O/DRG",
        class: ""
    },
    {
        label: "Qty/Kgs/Nos",
        class: ""
    },
    {
        label: "Rate",
        class: ""
    },
    {
        label: "Value",
        class: ""
    },
    {
        label: "",
        class: ""
    }
]