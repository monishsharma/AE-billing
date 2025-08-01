import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GoodsDescription from "./component.jsx";
import { deleteHsnCode, getHsnCodeList, postHsnCode } from "../../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHsnCodeListConnect: getHsnCodeList,
    postHsnCodeConnect: postHsnCode,
    deleteHsnCodeConnect: deleteHsnCode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDescription);
