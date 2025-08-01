import { createTypes } from "reduxsauce";

export default createTypes(
`
    SET_VENDORS
    SAVE_HSN_LIST
    SET_CONFIG
`,
{
    prefix: "config/"
}
);
