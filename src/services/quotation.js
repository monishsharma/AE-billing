export default (api) => {

    const saveQuotation = (payload) => {
        return api.post(`/quotation/save-quotation`, payload)
    };

    const updateQuotation = ({id,payload}) => {
        return api.put(`/quotation/update-quotation/${id}`, payload)
    };

    const getQuotation = (query) => {
        const params = new URLSearchParams(query).toString();
        const url =  `/quotation/get-quotation?${params}`;
        return api.get(url)
    };

    const getQuotationPdf = (payload, config = {}) => {
        return api.get(
          `/quotation/generate-quotation-pdf/${payload.id}`,
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




    return {
        getQuotation,
        saveQuotation,
        updateQuotation,
        getQuotationPdf
    }

}