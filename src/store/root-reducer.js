import { combineReducers } from "redux";
import InvoiceFormReducer from "./invoice-form/reducer";
import configReducer from "./config/reducer";
import authReducer from "./auth/reducer";

const rootReducer = combineReducers({
    invoiceForm: InvoiceFormReducer,
    config: configReducer,
    auth: authReducer
});

export default rootReducer;
