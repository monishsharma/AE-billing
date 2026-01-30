export default (api) => {

    const saveQuotation = (payload) => {
        return api.post(`/quotation/save-quotation`, payload)
    };

    const getQuotation = ({company, id}) => {
        const url = id ? `quotation/get-quotation-by-id/${id}` : `/quotation/get-quotation/${company}`;
        return api.get(url)
    };




    return {
        getQuotation,
        saveQuotation
    }

}