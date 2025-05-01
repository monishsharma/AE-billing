
export default (api) => {

    const getConfig = () => {
        return api.get(`/billing/get-invoice-config`)
    };

    const getVendorList = () => {
        return api.get(`/billing/vendor/list`)
    };

    const getInvoiceList = ({company, id, page, month, year}) => {
        const endpoint = id ? `/billing/invoice/${id}` : `/billing/invoice/list/${company}?page=${page}&month=${month}&year=${year}`;
        return api.get(endpoint);
    };

    const postInvoice = (payload) => {
        return api.post(`/billing/invoice`, payload)
    };

    const updateInvoice = (id, payload) => {
        return api.patch(`/billing/update/invoice/${id}`, payload)
    };

    const generateCSV = ({company, month, year}) => {
        return api.get(`/billing/generate-csv?company=${company}&month=${month}&year=${year}`)
    };

    const updateVendorList = (payload) => {
        return api.post(`/billing/update/vendor/list`, payload)
    };

    const getBillPdf = (payload) => {
        return api.get(`/billing/generate-pdf/${payload.id}/${payload.downloadOriginal}`, {
          responseType: 'blob',
          headers: {
            Accept: 'application/pdf',
          },
        });
      };

    const getVendor = (id) => {
        return api.get(`/billing/vendor/${id}`);
    };


    return {
        getConfig,
        getVendor,
        getBillPdf,
        postInvoice,
        generateCSV,
        getVendorList,
        getInvoiceList,
        updateInvoice,
        updateVendorList
    };
};
