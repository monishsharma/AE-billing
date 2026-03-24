import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PurchaseOrder from "./component.jsx";
import { getPoList } from "../../store/purchase-order/action.js";

const mapStateToProps = ({
    config,
    purchaseOrder
}) => ({
    config,
    purchaseOrder
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPoListConnect: getPoList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
