import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShippingDetails from "./component.jsx";
import { getBillPdf, postInvoice, resetReducer, updateInvoice } from "../../../store/invoice-form/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postInvoiceConnect: postInvoice,
    resetReducerConnect: resetReducer,
    getBillPdfConnect: getBillPdf,
    updateInvoiceConnect: updateInvoice
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShippingDetails);
