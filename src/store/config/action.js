import Swal from "sweetalert2";
import { BillingService } from "../../services";
import  Types from './actionTypes';



const setData = ({data}) => ({
    type: Types.SET_VENDORS,
    data
});

const saveHSNList = ({data}) => ({
    type: Types.SAVE_HSN_LIST,
    data
});


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

export const getVendor = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        BillingService.getVendor(id)
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
