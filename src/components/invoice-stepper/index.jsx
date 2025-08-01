import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvoiceStepper from "./component.jsx";
import { setData, setCurrentStep, saveData, getConfig, getInvoiceList, saveApiData } from "../../store/invoice-form/action.js";
import { getHsnCodeList } from "../../store/config/action.js";

const mapStateToProps = ({
    invoiceForm
}) => ({invoiceForm});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setDataConnect: setData,
    saveDataConnect: saveData,
    getConfigConnect: getConfig,
    setCurrentStepConnect: setCurrentStep,
    getInvoiceListConnect: getInvoiceList,
    saveApiDataConnect: saveApiData,
    getHsnCodeListConnect: getHsnCodeList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceStepper);
