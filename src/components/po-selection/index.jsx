import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PoSelection from "./component.jsx";
import { getPoList } from "../../store/purchase-order/action.js";
import { getInvoiceList } from "../../store/invoice-form/action.js";

const mapStateToProps = ({
    purchaseOrder
}) => ({purchaseOrder});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPoListConnect: getPoList,
    getInvoiceListConnect: getInvoiceList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PoSelection);
