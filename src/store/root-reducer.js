import { combineReducers } from "redux";
import InvoiceFormReducer from "./invoice-form/reducer";
import configReducer from "./config/reducer";
import authReducer from "./auth/reducer";
import QuotationReducer from "./quotation/reducer";
import PurhaseOrderReducer from "./purchase-order/reducer"

const rootReducer = combineReducers({
    invoiceForm: InvoiceFormReducer,
    config: configReducer,
    auth: authReducer,
    quotation: QuotationReducer,
    purchaseOrder: PurhaseOrderReducer
});

export default rootReducer;
