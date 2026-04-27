import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";
import { VENDOR_STEPS } from "../../constants/app-constant";
import { createPlantDetailInitialValue } from "../../components/vendor-steps/vendor-plant-detail/selector";
import { createInitialValue } from "../../components/vendor-steps/vendor-supply-rates/selector";


export const INITIAL_STATE = {
   vendorsList: [],
   hsn: [],
   vendorForm: {
        name: "",
        GSTIN: "",
        PAN: "",
        type: "",
        label: "",
        materialCode: "",
        vendorCode: "",
        plantRows: [createPlantDetailInitialValue()],
        supplyRate: [createInitialValue()],
        currentStep: 0

   },
};



export const setVendorList = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        vendorsList: data,
    }
};

export const saveHsnList = (state = INITIAL_STATE, {data}) => {
    return {
        ...state,
        hsn: [
            ...data
        ]
    }
};

export const saveData = (state = INITIAL_STATE, { stepName, data }) => {
    return {
        ...state,
        vendorForm: {
            ...state.vendorForm,
            // [stepName]: {
                // ...state.vendorForm[stepName],
                ...data
            // }
        }

    }
};

export const setCurrentStep = (state = INITIAL_STATE, { step }) => {
    return {
        ...state,
        vendorForm: {
            ...state.vendorForm,
             currentStep: step
        }
    }
};

export const setVendorDetail = (state = INITIAL_STATE, {data}) => {
    return {
        ...state,
        vendorForm: {
            ...state.vendorForm,
            currentStep: 0,
            // primitive fields (safe)
            name: data.name,
            GSTIN: data.GSTIN,
            PAN: data.PAN,
            type: data.type,
            label: data.label,
            materialCode: data.materialCode,
            vendorCode: data.vendorCode,

            // ⚠️ FIXED: clone arrays properly
            supplyRate: data.supplyRate
                ? data.supplyRate.map(item => ({ ...item }))
                : [createInitialValue()],

            // (if you add plantRows later)
            plantRows: data.plantRows
                ? data.plantRows.map(item => ({ ...item }))
                : [createPlantDetailInitialValue()],
        }
    }
}

export const HANDLERS = {
    [Types.SET_VENDORS]: setVendorList,
    [Types.SAVE_HSN_LIST]: saveHsnList,
    [Types.SAVE_DATA]: saveData,
    [Types.SET_ACTIVE_STEP]: setCurrentStep,
    [Types.SAVE_VENDOR_DETAIL]: setVendorDetail
};


export default createReducer(INITIAL_STATE, HANDLERS);
