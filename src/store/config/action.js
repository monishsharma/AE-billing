import Swal from "sweetalert2";
import { BillingService, ConfigService } from "../../services";
import  Types from './actionTypes';

const resetVendorForm = () => ({
    type: Types.RESET_VENDOR_DETAIL,
});

const setData = ({data, detail = null}) => ({
    type: Types.SET_VENDORS,
    data,
    detail
});

const saveHSNList = ({data}) => ({
    type: Types.SAVE_HSN_LIST,
    data
});

const saveBakeliteRatesList = ({data}) => ({
    type: Types.SAVE_BAKELITES_RATE_LIST,
    data
});

const saveData = ({ stepName, data }) => ({
    type: Types.SAVE_DATA,
    stepName,
    data
})

const setCurrentStep = ({step}) => ({
    type: Types.SET_ACTIVE_STEP,
    step
});

const setVendorDetail = ({data}) => ({
    type: Types.SAVE_VENDOR_DETAIL,
    data
})


export const getVendorList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getVendorList()
        .then((res) => {
            dispatch(setData({data: res.data}));
            resolve(res.data);
        })
        .catch((err) => {
            dispatch(setData({data: []}));
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const updateVendorList = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.updateVendorList(payload)
        .then((res) => {
            // dispatch(setData({data: res.data.vendors}));
            resolve(res.data);
        })
        .catch((err) => {
            dispatch(setData({data: []}));
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const updateVendor = (id, payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.updateVendor(id, payload)
        .then((res) => {
            // dispatch(setData({data: res.data.vendors}));
            resolve(res.data);
        })
        .catch((err) => {
            dispatch(setData({data: []}));
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}

export const getVendor = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getVendor(id)
        .then((res) => {
            dispatch(setVendorDetail({data: res.data}));
            resolve(res.data);
        })
        .catch((err) => {
            dispatch(setVendorDetail({data: []}));
            reject(err);
            Swal.fire({
                icon: "error",
                text: err.error,
            })
        })
    })
}


export const getBakeliteRates = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getBakeliteRates()
        .then((res) => {
            dispatch(saveBakeliteRatesList({data: res.data}));
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

export const postBakeliteRate = (payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.postBakeliteRate(payload)
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

export const deleteBakeliteRate = ({id}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.deleteBakeliteRate({id})
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

export const editBakeliteRate = (id, payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.editBakeliteRate(id, payload)
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

export const getHsnCodeList = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getHsnCodeList()
        .then((res) => {
            dispatch(saveHSNList({data: res.data}));
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

export const postHsnCode = (payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.postHsnCode(payload)
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

export const deleteHsnCode = ({id}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.deleteHsnCode({id})
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

export const editHSNCode = (id, payload) => () => {
    return new Promise((resolve, reject) => {
        BillingService.editHSNCode(id, payload)
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

export const getConfig = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        ConfigService.getConfig()
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

export const postConfig = (payload) => () => {
    return new Promise((resolve, reject) => {
        ConfigService.postConfig(payload)
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

export const updateConfig = (payload, key) => () => {
    return new Promise((resolve, reject) => {
        ConfigService.updateConfig(payload, key)
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
    saveData,
    resetVendorForm,
    setCurrentStep
}
