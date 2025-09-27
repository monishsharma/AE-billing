import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Payment from "./component.jsx";
import { getPaymentInfo, getReport, uploadPaymentFile } from "../../store/invoice-form/action.js";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    uploadPaymentFileConnect: uploadPaymentFile,
    getPaymentInfoConnect: getPaymentInfo,
    getReportConnect: getReport
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
