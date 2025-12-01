import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GoodsDescription from "./component.jsx";
import { deleteHsnCode, getHsnCodeList, postHsnCode } from "../../../store/config/action.js";
import { getPODetail } from "../../../store/ASN/action.js";

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHsnCodeListConnect: getHsnCodeList,
    postHsnCodeConnect: postHsnCode,
    deleteHsnCodeConnect: deleteHsnCode,
    getPODetailConnect: getPODetail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDescription);
