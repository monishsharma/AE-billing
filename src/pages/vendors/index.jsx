import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Vendors from "./component.jsx";
import {getVendorList, updateVendorList, resetVendorForm} from "../../store/config/action.js"

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getVendorListConnect: getVendorList,
    updateVendorListConnect: updateVendorList,
    resetVendorFormConnect: resetVendorForm
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
