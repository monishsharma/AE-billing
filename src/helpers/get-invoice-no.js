export const getNextInvoiceNo = (data) => {
    if (!data)return "";
    const {prefix, year, nextInvoiceNo} = data || {};
    return `${prefix}/${year}-${nextInvoiceNo}`
}

export const getPreviousInvoiceNo = (data) => {
    if (!data)return "";
    const {prefix, year, lastInvoiceNo} = data || {};
    return `${prefix}/${year}-${lastInvoiceNo}`
}