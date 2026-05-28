import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HsnCodes from "./component.jsx";
import { deleteHsnCode, editHSNCode, getHsnCodeList, postHsnCode, getBakeliteRates, postBakeliteRate, editBakeliteRate, deleteBakeliteRate } from "../../store/config/action.js";

const mapStateToProps = ({
    config
}) => ({
    config
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getHsnCodeListConnect: getHsnCodeList,
    postHsnCodeConnect: postHsnCode,
    deleteHsnCodeConnect: deleteHsnCode,
    editHSNCodeConnect: editHSNCode,
    getBakeliteRatesConnect: getBakeliteRates,
    postBakeliteRateConnect: postBakeliteRate,
    editBakeliteRateConnect: editBakeliteRate,
    deleteBakeliteRateConnect: deleteBakeliteRate
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HsnCodes);
