import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreateQuotation from "./component.jsx";
import {getConfig, saveData, saveQuotation, getQuotation, updateQuotation} from "../../store/quotation/action.js";
import { getBakeliteRates } from "../../store/config/action.js";
import { saveApiData, resetReducer } from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    quotation
}) => ({
    quotation
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveApiDataConnect: saveApiData,
    saveDataConnect: saveData,
    getConfigConnect: getConfig,
    saveQuotationConnect: saveQuotation,
    resetReducerConnect: resetReducer,
    updateQuotationConnect: updateQuotation,
    getQuotationConnect: getQuotation,
    getBakeliteRatesConnect: getBakeliteRates,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuotation);
