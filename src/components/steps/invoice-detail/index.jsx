import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvoiceDetail from "./component.jsx";
import { getConfig } from "../../../store/invoice-form/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getConfigConnect: getConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
