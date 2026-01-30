import TextField from '@mui/material/TextField';
import { COMPANY_TYPE, QUOTATION_FIELDS, QUOTATION_STEPPER_NAME } from '../../constants/app-constant';
import { isMobileDevice } from '../../helpers/is-mobile-device';

export const INPUTS = [
    {
        id: QUOTATION_FIELDS.QUOTATION_COMPANY,
        name: QUOTATION_FIELDS.QUOTATION_COMPANY,
        placeholder: "Company",
        type: "select",
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        key: QUOTATION_FIELDS.QUOTATION_COMPANY,
        component: TextField,
        optionsFrom: "companyType",
        extraProps: {
            select: true,
            disableOnEdit: true
        },
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_NO,
        name: QUOTATION_FIELDS.QUOTATION_NO,
        placeholder: "Quotation No",
        type: "textField",
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        key: QUOTATION_FIELDS.QUOTATION_NO,
        component: TextField,
        extraProps: {
            disableOnEdit: true
        },
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_CUSTOMER,
        name: "customer",
        placeholder: "Customer",
        type: "select",
        key: QUOTATION_FIELDS.QUOTATION_CUSTOMER,
        stepName: QUOTATION_STEPPER_NAME.BUYER_DETAIL,
        component: TextField,
        disabledProp: true,
        extraProps: {
            select: true,
        },
        optionsFrom: "vendorList"
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_DATE,
        name: QUOTATION_FIELDS.QUOTATION_DATE,
        placeholder: "Invoice Date",
        type: "textField",
        key: QUOTATION_FIELDS.QUOTATION_DATE,
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
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

];

export const columns = [
    {
        id: 'sno',
        label: `${isMobileDevice() ? "Items" : "S.No"}`,
        class: ""
    },
    {
        id: 'Description',
        label: "Description",
        class: true
    },
    {
        id: 'Rate',
        label: "Rate",
        class: ""
    },
    {
        id: 'drawingNO',
        label: "Drawing No",
        class: ""
    }
];

export const ITEMS_INPUT = [
    {
        id: 'sno',
        name: 'sno',
        placeholder: "S.No",
        initialValue: "",

    },
    {
        id: 'description',
        name: 'description',
        placeholder: "Item Description",
        initialValue: "",
        extraProps: {
            multiline: true
        }
    },
    {
        id: 'rate',
        name: 'rate',
        placeholder: "Rate",
        initialValue: "",
        extraProps: {
            type: "number"
        }
    },
    {
        id: 'drawingNo',
        name: 'drawingNo',
        placeholder: "Drawing No",
        initialValue: "",

    }
]

export const createInitialValue = () => {
    return ITEMS_INPUT.reduce((acc, item) => {
        acc[item.name] = item.initialValue;
        return acc;
    }, {});
}

export const createInitialValueValidation = () => {
    return ITEMS_INPUT.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
    }, {});
}

