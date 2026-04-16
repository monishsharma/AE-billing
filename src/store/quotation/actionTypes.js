import { createTypes } from "reduxsauce";

export default createTypes(
`
    SAVE_DATA
    SET_QUOTATION_CONFIG
    RESET_REDUCER
    SET_API_DATA
`,
{
    prefix: "quotation/"
}
);
