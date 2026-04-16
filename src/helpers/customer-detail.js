import { COMPANY_TYPE } from "../constants/app-constant";

export const getCustomerDetail = ({
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

    }
}