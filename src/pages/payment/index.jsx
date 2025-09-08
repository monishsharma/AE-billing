import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Payment from "./component.jsx";
import { uploadPaymentFile } from "../../store/invoice-form/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    uploadPaymentFileConnect: uploadPaymentFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
