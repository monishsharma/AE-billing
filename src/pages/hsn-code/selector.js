export const ITEM_TYPE = {
    HSN_CODE: "hsnCode",
    UNIT_TYPE: "unitType",
    BAKELITE_RATE: "bakeliteRate"
}

export const MODAL_INPUT = [
    {
        label: "HSN Code",
        key: "label"
    },
    {
        label: "Description",
        key: "desc"
    }
]

export const COLUMNS = [
    { field: "Sno", key: "sno" },
    { field: "HSN Code", key: "label" },
    { field: "Description", key: "desc" },
    { field: "Action", key: "action" }
];

// export const MATERIAL_COLUMN = [
//     { field: "Sno", key: "sno", },
//     { field: "Material Type", key: "label" },
//     { field: "Material Code", key: "code" },
//     { field: "Action", key: "action" },
// ];

// export const MATERIAL_INPUTS = [
//     {
//         label: "Material Type",
//         key: "label"
//     },
//     {
//         label: "Material Code",
//         key: "code"
//     }
// ]
// export const orderTypeOptions = [
//     { value: "Roller", label: "Roller", code: "280000052" },
//     { value: "Frame", label: "Frame", code: "283051012" },
//     { value: "Bakelite", label: "Bakelite", code: "320007177" },
//     { value: "Other", label: "Other", code: "-" },
// ];

// export const UNIT_TYPE_DATA = [
//     {
//                 label: "KGS"
//             },
//             {
//                 label: "NOS"
//             },
//             {
//                 label: "SQFT"
//             }
// ];

// export const UNIT_TYPE_COLUMN = [
//     { field: "Sno", key: "sno" },
//     { field: "Unit Type", key: "label" },
//     { field: "Action", key: "action" },
// ]

// export const UNIT_INPUTS = [
//     {
//         label: "Material Type",
//         key: "label"
//     },

// ]

export const BAKELITE_RATE_COLUMN = [
    { field: "Sno", key: "sno" },
    { field: "Mat. Size", key: "label" },
    { field: "Rate/SQfoot", key: "rate" },
    { field: "Action", key: "action" },
]

export const BAKELITE_RATE_MODAL_INPUTS = [
    {
        label: "Material Size",
        key: "label"
    },
    {
        label: "Rate/SQfoot",
        key: "rate"
    }
]

export const BAKELITE_RATE_OPTIONS = [
    { label: "8MM", code: "875" },
    { label: "10MM", code: "1145" },
    { label: "12MM", code: "1325" },
    { label: "20MM", code: "2445" },
];

// make a array to render textfield for original and duplicate invoice height for both AE and PEW
export const INVOICE_CONFIG = [
    {
        label: "AE Duplicate Invoice Height",
        key: "aeDuplicateInvoiceHeight"
    },
    {
        label: "AE Original Invoice Height",
        key: "aeOriginalInvoiceHeight"
    },
    {
        label: "PEW Duplicate Invoice Height",
        key: "pewDuplicateInvoiceHeight"
    },
    {
        label: "PEW Original Invoice Height",
        key: "pewOriginalInvoiceHeight"
    }
]