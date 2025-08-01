import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";


export const INITIAL_STATE = {
   vendorsList: [],
   hsn: []
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




export const HANDLERS = {
    [Types.SET_VENDORS]: setVendorList,
    [Types.SAVE_HSN_LIST]: saveHsnList

};


export default createReducer(INITIAL_STATE, HANDLERS);
