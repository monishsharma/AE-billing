import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";


export const INITIAL_STATE = {
   vendorsList: []
};



export const setVendorList = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        vendorsList: data,
    }
};





export const HANDLERS = {
    [Types.SET_VENDORS]: setVendorList,

};


export default createReducer(INITIAL_STATE, HANDLERS);
