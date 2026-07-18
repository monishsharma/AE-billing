import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddVendorV2 from "./component.jsx";


const mapStateToProps = ({
    config
}) => ({config});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddVendorV2);
