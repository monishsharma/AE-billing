import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddVendorV2 from "./component.jsx";
import {getVendor, updateVendorList,getVendorList, saveData, setCurrentStep, updateVendor} from "../../store/config/action.js"


const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateVendorListConnect: updateVendorList,
    getVendorConnect: getVendor,
    getVendorListConnect: getVendorList,
    saveDataConnect: saveData,
    setCurrentStepConnect: setCurrentStep,
    updateVendorConnect: updateVendor
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddVendorV2);
