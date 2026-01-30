import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Quotation from "./component.jsx";
import { getQuotation, resetReducer } from "../../store/quotation/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    resetReducerConnect: resetReducer,
    getQuotationConnect: getQuotation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
