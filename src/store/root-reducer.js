import { combineReducers } from "redux";
import InvoiceFormReducer from "./invoice-form/reducer";
import configReducer from "./config/reducer";
const rootReducer = combineReducers({
    invoiceForm: InvoiceFormReducer,
    config: configReducer
});


export default rootReducer;
