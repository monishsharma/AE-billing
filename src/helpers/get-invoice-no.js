export const getNextInvoiceNo = (data, key="nextInvoiceNo") => {
    if (!data)return "";
    const {prefix, year} = data || {};
    return `${prefix}/${year}-${data[key] || ""}`
}

export const getPreviousInvoiceNo = (data) => {
    if (!data)return "";
    const {prefix, year, lastInvoiceNo} = data || {};
    return `${prefix}/${year}-${lastInvoiceNo || ""}`
}