import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Invoice from "./component.jsx";
import { getInvoiceList, saveApiData, resetReducer, getBillPdf, generateCSV, updateInvoice, searchInvoice, generateGstReport } from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    config,
    invoiceForm
}) => ({
    config,
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    saveApiDataConnect: saveApiData,
    resetReducerConnect: resetReducer,
    getBillPdfConnect: getBillPdf,
    generateCSVConnect: generateCSV,
    updateInvoiceConnect:updateInvoice,
    searchInvoiceConnect:searchInvoice,
    generateGstReportConnect: generateGstReport
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
