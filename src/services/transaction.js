export default (api) => {

  const recordTransaction = (payload) => {
    return api.post(`/transaction/payment`, payload);
  };


  return {
    recordTransaction
  };
};
