import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GoodsDescription from "./component.jsx";
import { deleteHsnCode, getHsnCodeList, postHsnCode } from "../../../store/config/action.js";
import { getPODetail } from "../../../store/ASN/action.js";
import { getPoList } from "../../../store/purchase-order/action.js";

const mapStateToProps = ({
    config,
    purchaseOrder
}) => ({config, purchaseOrder});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHsnCodeListConnect: getHsnCodeList,
    postHsnCodeConnect: postHsnCode,
    deleteHsnCodeConnect: deleteHsnCode,
    getPODetailConnect: getPODetail,
    getPoListConnect: getPoList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDescription);
