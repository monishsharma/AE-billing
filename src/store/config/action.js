import Swal from "sweetalert2";
import { BillingService } from "../../services";
import  Types from './actionTypes';



const setData = ({data, detail = null}) => ({
    type: Types.SET_VENDORS,
    data,
    detail
});

const saveHSNList = ({data}) => ({
    type: Types.SAVE_HSN_LIST,
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
            dispatch(setData({data: res.data.vendors}));
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
            dispatch(setVendorDetail({data: res.data.vendors?.[0]}));
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

export const deleteHsnCode = ({hsnId}) => () => {
    return new Promise((resolve, reject) => {
        BillingService.deleteHsnCode({hsnId})
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

export {
    saveData,
    setCurrentStep
}
