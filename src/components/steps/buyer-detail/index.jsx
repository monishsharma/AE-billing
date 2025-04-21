import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BuyerDetail from "./component.jsx";

const mapStateToProps = ({config}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetail);
