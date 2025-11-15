export default (api) => {

    const generateASN = ({ poNumber, invoiceId }) => {
        return api.get(`/ASN/get/ASN/detail/${poNumber}/${invoiceId}`)
    };

    return {
        generateASN
    }

}