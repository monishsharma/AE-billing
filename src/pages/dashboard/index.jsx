import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dashboard from "./component.jsx";
import { generateCSV, getInvoiceList, getReport, resetReducer} from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    invoiceForm
}) => ({
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    getReportConnect: getReport,
    resetReducerConnect: resetReducer,
    generateCSVConnect: generateCSV,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
