import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddVendor from "./component.jsx";
import {getVendor, updateVendorList,getVendorList} from "../../store/config/action.js"


const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateVendorListConnect: updateVendorList,
    getVendorConnect: getVendor,
    getVendorListConnect: getVendorList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddVendor);
