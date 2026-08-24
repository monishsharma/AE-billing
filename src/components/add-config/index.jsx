import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddConfig from "./component.jsx";
import { getAppConfig, postAppConfig } from "../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({
    config
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAppConfigConnect: getAppConfig,
    postAppConfigConnect: postAppConfig
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddConfig);
