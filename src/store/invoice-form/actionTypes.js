import { createTypes } from "reduxsauce";

export default createTypes(
`
    SET_FORM
    SAVE_DATA
    SAVE_API_dATA
    GET_CONFIG
    SET_ACTIVE_STEP
    SET_EMPLOYEE_DETAIL
    RESET_REDUCER
`,
{
    prefix: "invoiceForm/"
}
);
