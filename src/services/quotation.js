export default (api) => {

    const saveQuotation = (payload) => {
        return api.post(`/quotation/save-quotation`, payload)
    };

    const updateQuotation = ({id,payload}) => {
        return api.put(`/quotation/update-quotation/${id}`, payload)
    };

    const getQuotation = ({company, id}) => {
        const url = id ? `quotation/get-quotation-by-id/${id}` : `/quotation/get-quotation/${company}`;
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