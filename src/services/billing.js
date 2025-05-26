
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
        return api.get(`/billing/generate-csv?company=${company}&month=${month}&year=${year}`, {
            responseType: 'blob',
        })
    };

    const updateVendorList = (payload) => {
        return api.post(`/billing/update/vendor/list`, payload)
    };

    const getBillPdf = (payload, config = {}) => {
        return api.get(
          `/billing/generate-pdf/${payload.id}/${payload.downloadOriginal}`,
          {
            responseType: 'blob',
            headers: {
              Accept: 'application/pdf',
              ...(config.headers || {}),
            },
            onDownloadProgress: config.onDownloadProgress,
            ...config,
          }
        );
      };

    const getVendor = (id) => {
        return api.get(`/billing/vendor/${id}`);
    };

    const getReport = ({company, month, year}) => {
        return api.get(`/billing/get/invoice/report/${company}?month=${month}&year=${year}`);
    };

    const searchInvoice = ({company, searchTerm,page}) => {
        return api.get(`/billing/search/invoice?searchTerm=${searchTerm}&company=${company}&page=${page}`);
    }

    return {
        getReport,
        getConfig,
        getVendor,
        getBillPdf,
        postInvoice,
        generateCSV,
        getVendorList,
        getInvoiceList,
        updateInvoice,
        searchInvoice,
        updateVendorList
    };
};
