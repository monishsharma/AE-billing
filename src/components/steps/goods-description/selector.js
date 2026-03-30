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
        component: TextField,
        span: {
            show: true,
            text: "Select PO"
        }
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
        type: "autocomplete",
        component: TextField,
        span: {
            show: true,
            text: "Hsn Config"
        }
    },
    {
        id: "type",
        name: "Material Type",
        placeholder: "Material Type",
        key: "type",
        type: "select",
        component: TextField,
        options: [
            {
                label: "KGS"
            },
            {
                label: "NOS"
            },
            {
                label: "SQFT"
            }

        ]
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
        intialValue: 0,
        span: true,
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

export const ASN_INITIAL_STATE = {
    totalQty: 0,
    qtyLeft: 0,
}

export const normalizePOInput = (raw = "") => {

    const cleaned = raw
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/,+/g, ",");

    const parts = cleaned
        .split(",")
        .map(p => p.trim())
        .filter(Boolean);

    let prefix = "";

    // detect prefix from first full PO
    if (parts[0] && parts[0].includes("/")) {
        prefix = parts[0].substring(0, parts[0].lastIndexOf("/") + 1);
    }

    const poArray = parts.map((p, index) => {

        // if already full PO keep it
        if (p.includes("/")) return p;

        // otherwise attach prefix
        return prefix ? `${prefix}${p}` : p;

    });

    const uniquePO = [...new Set(poArray)];

    return {
        poDisplay: raw.toUpperCase(),
        po: uniquePO
    };
};

export const formatPoDisplay = (poArray = []) => {
    if (!poArray.length) return "";

    const first = poArray[0];

    // detect last separator (/ or -)
    const lastSlash = first.lastIndexOf("/");
    const lastDash = first.lastIndexOf("-");

    const lastIndex = Math.max(lastSlash, lastDash);

    // if no separator found → return normal join
    if (lastIndex === -1) return poArray.join(",");

    const prefix = first.substring(0, lastIndex + 1);

    return poArray
        .map((po, index) => {
            if (index === 0) return po;

            return po.startsWith(prefix)
                ? po.substring(prefix.length)
                : po;
        })
        .join(",");
};