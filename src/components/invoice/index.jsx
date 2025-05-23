import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Invoice from "./component.jsx";
import { getInvoiceList, saveApiData, resetReducer, getBillPdf, generateCSV, updateInvoice, searchInvoice } from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    invoiceForm
}) => ({
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    saveApiDataConnect: saveApiData,
    resetReducerConnect: resetReducer,
    getBillPdfConnect: getBillPdf,
    generateCSVConnect: generateCSV,
    updateInvoiceConnect:updateInvoice,
    searchInvoiceConnect:searchInvoice
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
