import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HsnCodes from "./component.jsx";
import { deleteConfigValue, getAppConfig,updateAppConfig } from "../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({
    config
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getAppConfigConnect: getAppConfig,
    updateAppConfigConnect: updateAppConfig,
    deleteConfigValueConnect: deleteConfigValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HsnCodes);
