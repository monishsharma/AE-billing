import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShippingDetails from "./component.jsx";
import { getBillPdf, postInvoice, resetReducer, updateInvoice } from "../../../store/invoice-form/action.js";
import { checkASNExist, generateASN } from "../../../store/ASN/action.js";
import { updatePo } from "../../../store/purchase-order/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postInvoiceConnect: postInvoice,
    resetReducerConnect: resetReducer,
    getBillPdfConnect: getBillPdf,
    updateInvoiceConnect: updateInvoice,
    generateASNConnect: generateASN,
    checkASNExistConnect: checkASNExist,
    updatePoConnect: updatePo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShippingDetails);
