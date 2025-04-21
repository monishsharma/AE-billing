import { createTypes } from "reduxsauce";

export default createTypes(
`
    SET_VENDORS
    SET_CONFIG
`,
{
    prefix: "config/"
}
);
