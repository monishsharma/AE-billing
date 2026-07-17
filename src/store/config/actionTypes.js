import { createTypes } from "reduxsauce";

export default createTypes(
`
    SET_VENDORS
    SAVE_HSN_LIST
    SAVE_BAKELITES_RATE_LIST
    SET_CONFIG
    SAVE_DATA
    RESET_VENDOR_DETAIL
    SAVE_VENDOR_DETAIL
    SET_ACTIVE_STEP
`,
{
    prefix: "config/"
}
);
