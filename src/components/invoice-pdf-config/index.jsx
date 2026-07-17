import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvoiceStepper from "./component.jsx";
import { postConfig } from "../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postConfigConnect: postConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceStepper);
