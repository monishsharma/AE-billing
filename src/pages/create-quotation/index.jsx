import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreateQuotation from "./component.jsx";
import {getConfig, saveData, saveQuotation, resetReducer, getQuotationById} from "../../store/quotation/action.js";

const mapStateToProps = ({
    quotation
}) => ({
    quotation
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveDataConnect: saveData,
    getConfigConnect: getConfig,
    saveQuotationConnect: saveQuotation,
    resetReducerConnect: resetReducer,
    getQuotationByIdConnect: getQuotationById
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuotation);
