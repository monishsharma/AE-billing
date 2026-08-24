import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InvoiceStepper from "./component.jsx";
import { postAppConfig } from "../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    postConfigConnect: postAppConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceStepper);
