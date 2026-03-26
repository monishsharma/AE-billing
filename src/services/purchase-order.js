export default (api) => {

    const getPoList = (query) => {
      const params = new URLSearchParams(query).toString();
      return api.get(`/purchase-order/get-po-list?${params}`);
  };

   const updatePo = (payload) => {
      return api.patch(`/purchase-order/update-po-on-invoice`, payload);
  };

  const deletePo = (poId) => {
      return api.delete(`/purchase-order/delete/po/${poId}`);
  };

  return {
    getPoList,
    updatePo,
    deletePo
  };
};
