import  Types from './actionTypes';
import {BillingService} from "../../services"
import Swal from 'sweetalert2';

const setData = ({data}) => ({
    type: Types.SET_FORM,
    data
});

const saveData = ({ stepName, data }) => ({
    type: Types.SAVE_DATA,
    stepName,
    data
})

const saveApiData = ({ data }) => ({
    type: Types.SAVE_API_dATA,
    data
})



const setCurrentStep = ({step}) => ({
    type: Types.SET_ACTIVE_STEP,
    step
});

const resetReducer = () => ({
    type: Types.RESET_REDUCER,
});

export const getConfig = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getConfig()
        .then((res) => {
            let data = {
                config: res.data
            };
            dispatch(setData({data}));
            resolve(data);
        })
        .catch((err) => {
            const dataForError = {
                config: {}
            }
            Swal.fire({
                icon: "error",
                text: err.error,
            })
            dispatch(setData({data:dataForError}));
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const postInvoice = (payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.postInvoice(payload)
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const getBillPdf = (payload, config = {}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.getBillPdf(payload,config)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}


export const getInvoiceList = ({company, id, page, month, year}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.getInvoiceList({company, id, page, month, year})
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const updateInvoice = (id, payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.updateInvoice(id, payload)
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}


export const generateCSV = ({company, month, year, forGST, forUnpaid}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.generateCSV({company, month, year, forGST, forUnpaid})
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const getUnpaidInvoices = ({month, year, company}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.getUnpaidInvoices({month, year, company})
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const getReport = ({company, month, year}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.getReport({company, month, year})
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}


const searchInvoice = ({company, searchTerm, page}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.searchInvoice({company, searchTerm, page})
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

const uploadPaymentFile = (payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.uploadPaymentFile(payload)
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

const getPaymentInfo = ({month, year}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.getPaymentInfo({month, year})
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}





export {
    setData,
    saveData,
    saveApiData,
    resetReducer,
    searchInvoice,
    setCurrentStep,
    getPaymentInfo,
    uploadPaymentFile
}


