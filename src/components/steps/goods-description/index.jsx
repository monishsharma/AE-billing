import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GoodsDescription from "./component.jsx";

const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDescription);
