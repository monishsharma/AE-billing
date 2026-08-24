import { Select, TextField } from "@mui/material";

export const INPUTS = [
    {
        label: "Config Key",
        name: "key",
        type: "text",
        placeholder: "Config Key",
        component: TextField,
    },
    {
        label: "Config Title",
        name: "title",
        placeholder: "Config Title",
        type: "text",
        component: TextField,
    }
];

export const COLUMNS = [
    {
        name: "key",
        label: "Column Key",
        component: TextField,
        placeholder: "Column Key",
        type: "text",
    },
    {
        name: "title",
        label: "Column Title",
        component: TextField,
        placeholder: "Column Title",
        type: "text",
    },
    {
        name: "type",
        label: "Data Type",
        component: TextField,
        type: "select",
        placeholder: "Data Type",
        options: [
            { value: "text", label: "Text" },
            { value: "number", label: "Number" }]
    }
]