import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./component.jsx";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
