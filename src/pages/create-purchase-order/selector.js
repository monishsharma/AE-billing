import TextField from "@mui/material/TextField";
import { PURCHASE_ORDER_FIELDS } from "../../constants/app-constant";

export const PO_DETAIL_INPUTS = [
    {
        id: PURCHASE_ORDER_FIELDS.PO_COMPANY,
        key: PURCHASE_ORDER_FIELDS.PO_COMPANY,
        placeholder: "Company",
        type: "select",
        component: TextField,
         extraProps: {
            disableOnEdit: true,
            select: true,
        },
        optionsFrom: "companyType",
    },
    {
        id: PURCHASE_ORDER_FIELDS.PO_NUMBER,
        key: PURCHASE_ORDER_FIELDS.PO_NUMBER,
        placeholder: "PO Number",
        component: TextField,
        extraProps: {
            disableOnEdit: true,
        },

    },
    {
        id: PURCHASE_ORDER_FIELDS.PO_DATE,
        key: PURCHASE_ORDER_FIELDS.PO_DATE,
        placeholder: "PO Date",
        component: TextField,
        extraProps: {
            type: "date",
            slotProps: {
                inputLabel: {
                    shrink: true
                },
            },
        },

    },

    {
        id: PURCHASE_ORDER_FIELDS.PO_CUSTOMER,
        key: PURCHASE_ORDER_FIELDS.PO_CUSTOMER,
        placeholder: "Customer",
        type: "select",
        disabledProp: true,
        component: TextField,
        extraProps: {
            select: true,
        },
        optionsFrom: "vendorList"
    },
    {
        id: PURCHASE_ORDER_FIELDS.TOTAL_VALUE,
        key: PURCHASE_ORDER_FIELDS.TOTAL_VALUE,
        placeholder: "Total Value",
        component: TextField,
        extraProps: {
            type: "number",

        },

    }
]

export const columns = [
  { id: 'sno', label: 'Sno', minWidth: 10 },
  { id: 'itemNo', label: 'Item No', minWidth: 10 },
  { id: 'hsn', label: 'HSN', minWidth: 80 },
  { id: 'unit', label: 'Unit', minWidth: 100 },
  { id: 'workOrder', label: 'Work Order', minWidth: 100 },
  { id: 'rate', label: 'Rate', minWidth: 100 },
  { id: 'orderedQty', label: 'Order QTY', minWidth: 100 },

  { id: 'value', label: 'Value', minWidth: 100, format: (value) => value.toFixed(2) },
];