import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Invoice from "./component.jsx";
import { getInvoiceList, saveApiData, resetReducer, getBillPdf } from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    invoiceForm
}) => ({
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    saveApiDataConnect: saveApiData,
    resetReducerConnect: resetReducer,
    getBillPdfConnect: getBillPdf
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
