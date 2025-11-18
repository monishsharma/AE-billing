export default (api) => {

    const generateASN = ({ poNumber, invoiceId, payload }) => {
        return api.post(`/ASN/get/ASN/detail/${poNumber}/${invoiceId}`, payload)
    };

    const checkASNExist = ({ poNumber, invoiceId }) => {
        return api.get(`/ASN/check/ASN/generation/${poNumber}/${invoiceId}`)
    }

    return {
        generateASN,
        checkASNExist
    }

}