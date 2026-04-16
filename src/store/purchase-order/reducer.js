import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";
import { PURCHASE_ORDER_FIELDS } from "../../constants/app-constant";


export const INITIAL_STATE = {
    [PURCHASE_ORDER_FIELDS.PO_COMPANY]: "",
    [PURCHASE_ORDER_FIELDS.PO_CUSTOMER]: "",
    [PURCHASE_ORDER_FIELDS.PO_DATE]: "",
    [PURCHASE_ORDER_FIELDS.PO_NUMBER]: "",
    [PURCHASE_ORDER_FIELDS.TOTAL_VALUE]: ""
};



export const saveData = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        ...data
    }
};


// export const saveApiData = (state = INITIAL_STATE, { data }) => {
//     return {
//         ...state,
//         ...data
//     }
// };

// export const resetReducer = (state = INITIAL_STATE) => {
//     return {
//         ...INITIAL_STATE,
//     }
// };



export const HANDLERS = {
    [Types.SAVE_DATA]: saveData,
    // [Types.RESET_REDUCER]: resetReducer,
    // [Types.SET_API_DATA]: saveApiData,
};


export default createReducer(INITIAL_STATE, HANDLERS);
