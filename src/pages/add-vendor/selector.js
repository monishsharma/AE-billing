import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';

// Define the INPUTS array with each field's configuration
export const INPUTS = [
    {
        id: "name",
        name: "name",
        placeholder: "Vendor Name",
        type: "textField",
        key: "name",
        component: TextField,
    },
    {
        id: "address",
        name: "Address",
        placeholder: "Address",
        type: "textField",
        key: "address",
        component: TextField
    },
    {
        id: "label",
        name: "Label",
        placeholder: "Label",
        type: "textField",
        key: "label",
        component: TextField
    },
    {
        id: "GSTIN",
        name: "GSTIN",
        placeholder: "GSTIN",
        type: "textField",
        key: "GSTIN",
        component: TextField
    },
    {
        id: "PAN",
        name: "PAN",
        placeholder: "PAN",
        type: "textField",
        key: "PAN",
        component: TextField,
        extraProps: {
            disabled: true
        }
    },

    {
        id: "materialCode",
        name: "Material Code",
        placeholder: "Material Code",
        type: "textField",
        key: "materialCode",
        component: TextField,
        preventValidation: true
    },
    {
        id: "vendorCode",
        name: "Vendor Code",
        placeholder: "Vendor Code",
        type: "textField",
        key: "vendorCode",
        component: TextField
    }
];


export const gstinStateCodes = [
    { code: '01', state: 'Jammu & Kashmir' },
    { code: '02', state: 'Himachal Pradesh' },
    { code: '03', state: 'Punjab' },
    { code: '04', state: 'Chandigarh' },
    { code: '05', state: 'Uttarakhand' },
    { code: '06', state: 'Haryana' },
    { code: '07', state: 'Delhi' },
    { code: '08', state: 'Rajasthan' },
    { code: '09', state: 'Uttar Pradesh' },
    { code: '10', state: 'Bihar' },
    { code: '11', state: 'Sikkim' },
    { code: '12', state: 'Arunachal Pradesh' },
    { code: '13', state: 'Nagaland' },
    { code: '14', state: 'Manipur' },
    { code: '15', state: 'Mizoram' },
    { code: '16', state: 'Tripura' },
    { code: '17', state: 'Meghalaya' },
    { code: '18', state: 'Assam' },
    { code: '19', state: 'West Bengal' },
    { code: '20', state: 'Jharkhand' },
    { code: '21', state: 'Odisha' },
    { code: '22', state: 'Chhattisgarh' },
    { code: '23', state: 'Madhya Pradesh' },
    { code: '24', state: 'Gujarat' },
    { code: '25', state: 'Daman and Diu' },
    { code: '26', state: 'Dadra and Nagar Haveli' },
    { code: '27', state: 'Maharashtra' },
    { code: '28', state: 'Andhra Pradesh (Old)' },
    { code: '29', state: 'Karnataka' },
    { code: '30', state: 'Goa' },
    { code: '31', state: 'Lakshadweep' },
    { code: '32', state: 'Kerala' },
    { code: '33', state: 'Tamil Nadu' },
    { code: '34', state: 'Puducherry' },
    { code: '35', state: 'Andaman and Nicobar Islands' },
    { code: '36', state: 'Telangana' },
    { code: '37', state: 'Andhra Pradesh (New)' },
    { code: '38', state: 'Ladakh' },
    { code: '97', state: 'Other Territory' }
  ];

export const getStateInfo = (GSTIN) => {
    const code = GSTIN.substring(0, 2);
    const state = gstinStateCodes.filter(st => parseInt(st.code) === parseInt(code));
    if (state.length) return state[0];
    return {
        code: 0,
        state: ""
    }
}

export const intialState = [
    {
        label: "Product Description",
        key: "type",
        intialValue: ""
    },
    {
        label: "Description",
        key: "description",
        intialValue: ""
    },
    {
        label: "Rate",
        key: "rate",
        intialValue: ""
    },

]

export const createInitialValue = () => {
    return intialState.reduce((acc, item) => {
        acc[item.key] = item.intialValue;
        return acc;
    }, {});
}

export const createInitialValueValidation = () => {
    return intialState.reduce((acc, item) => {
        if (!item.preventValidation) {
            acc[item.key] =  true;
        }
        return acc;
    }, {});
}