import { COMPANY_TYPE, gstinStateCodes } from "../constants/app-constant";

export const getCustomerDetail = ({
    branch,
    selectedCustomer,
    selectedCompany,
    ...rest
}) => {
    const materialCode = rest.materialCode || selectedCustomer.materialCode || "";
    const orderType = selectedCompany === COMPANY_TYPE.PADMA ? "Roller" : rest.orderType || selectedCustomer.orderType || ""
    const {
        id,
        address,
        isInterState,
        vendorCode,
        GSTIN,
        PAN,
        name,
        type,
        state,
        city,
    } = selectedCustomer;

    return {
            materialCode,
            orderType,
            customer: id,
            customerName: selectedCustomer.label,
            address,
            isInterState,
            vendorCode,
            GSTIN,
            PAN,
            name,
            type,
            city,
            state,
            branch: branch  || "",

    }
}

const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const getCustomerGSTINDetail = (GSTIN) => {
        if (gstinRegex.test(GSTIN.toUpperCase())) {
            const PAN = gstinRegex.test(GSTIN.toUpperCase()) ?  GSTIN.substring(2, 12) : "";
            return {
                PAN: PAN.toUpperCase(),
                GSTIN: GSTIN.toUpperCase()
            }
        } else {
            return {
                PAN: "",
                GSTIN: GSTIN.toUpperCase()
            }
        }

}

export const getStateInfo = (GSTIN) => {
    const code = GSTIN.substring(0, 2);
    const state = gstinStateCodes.filter(st => parseInt(st.code) === parseInt(code));
    if (state.length) return state[0];
    return {
        code: 0,
        state: ""
    }
}