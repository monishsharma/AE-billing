import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";
import { QUOTATION_FIELDS, QUOTATION_STEPPER_NAME } from "../../constants/app-constant";
import { createInitialValue } from "../../pages/create-quotation/selector";
import quotation from "../../services/quotation";


export const INITIAL_STATE = {
    [QUOTATION_STEPPER_NAME.QUOTATION_DETAIL]: {
        [QUOTATION_FIELDS.QUOTATION_NO]: "",
        [QUOTATION_FIELDS.QUOTATION_DATE]: "",
        [QUOTATION_FIELDS.QUOTATION_COMPANY]: "",
    },
    [QUOTATION_STEPPER_NAME.BUYER_DETAIL]: { },
    [QUOTATION_STEPPER_NAME.GOODS_DESCRIPTION]: {
        cost: "",
        items: [createInitialValue()]
    },
    quotationConfig: null
};



export const saveData = (state = INITIAL_STATE, { data, stepName }) => {
    return {
        ...state,
        [stepName]: {
            ...state[stepName],
            ...data
        },
    }
};

export const setData = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        quotationConfig: {
            ...data,
        }
    }
};

export const saveApiData = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        ...data
    }
};

export const resetReducer = (state = INITIAL_STATE) => {
    return {
        ...INITIAL_STATE,
    }
};



export const HANDLERS = {
    [Types.SAVE_DATA]: saveData,
    [Types.RESET_REDUCER]: resetReducer,
    [Types.SET_QUOTATION_CONFIG]: setData,
    [Types.SET_API_DATA]: saveApiData,
};


export default createReducer(INITIAL_STATE, HANDLERS);
