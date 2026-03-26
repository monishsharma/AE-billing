import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PurchaseOrder from "./component.jsx";
import { deletePo, getPoList } from "../../store/purchase-order/action.js";

const mapStateToProps = ({
    config,
    purchaseOrder
}) => ({
    config,
    purchaseOrder
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPoListConnect: getPoList,
    deletePoConnect: deletePo
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrder);
