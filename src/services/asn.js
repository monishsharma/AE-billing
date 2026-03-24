export default (api) => {
  const generateASN = ({ poNumber, payloadBody }) => {
    return api.post(`/ASN/get/ASN/detail/${poNumber}`, payloadBody);
  };

  const checkASNExist = ({ poNumber, payload }) => {
    return api.post(`/ASN/check/ASN/generation/${poNumber}`, payload);
  };

  const getPODetail = ({ poNumber }) => {
    return api.get(`/purchase-order/get/details/${poNumber}`);
  };

  const AITesting = (payload) => {
    return api.post(`/purchase-order/parse-po`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return {
    generateASN,
    getPODetail,
    AITesting,
    checkASNExist,
  };
};
