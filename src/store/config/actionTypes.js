import { createTypes } from "reduxsauce";

export default createTypes(
`
    SET_VENDORS
    SAVE_HSN_LIST
    SET_CONFIG
    SAVE_DATA
    SAVE_VENDOR_DETAIL
    SET_ACTIVE_STEP
`,
{
    prefix: "config/"
}
);
