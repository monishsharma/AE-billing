import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Quotation from "./component.jsx";
import { getConfig, getQuotation, getQuotationPdf, resetReducer, saveQuotation } from "../../store/quotation/action.js";

const mapStateToProps = ({
    config
}) => ({
    config
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    resetReducerConnect: resetReducer,
    getQuotationConnect: getQuotation,
    getConfigConnect: getConfig,
    saveQuotationConnect: saveQuotation,
    getQuotationPdfConnect: getQuotationPdf
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
