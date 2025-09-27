import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dashboard from "./component.jsx";
import { generateCSV, getInvoiceList, getReport, getUnpaidInvoices, resetReducer} from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    auth,
    invoiceForm
}) => ({
    auth,
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    getReportConnect: getReport,
    resetReducerConnect: resetReducer,
    generateCSVConnect: generateCSV,
    getUnpaidInvoicesConnect: getUnpaidInvoices
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
