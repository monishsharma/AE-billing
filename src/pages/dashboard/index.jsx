import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dashboard from "./component.jsx";
import { getInvoiceList, getReport} from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    invoiceForm
}) => ({
    invoiceForm
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getInvoiceListConnect: getInvoiceList,
    getReportConnect: getReport
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
