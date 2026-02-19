export const getCustomerDetail = ({
    selectedCustomer,
    ...rest
}) => {
    const materialCode = rest.materialCode || selectedCustomer.materialCode || "";
    const orderType = rest.orderType || selectedCustomer.orderType || "";
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