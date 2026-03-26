import { PurchaseOrderService } from "../../services";
import Types from "./actionTypes";

const saveData = (data) => ({
    type: Types.SAVE_DATA,
    data
})


export const getPoList = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        PurchaseOrderService.getPoList(query)
        .then((res) => {
            dispatch(saveData(res.data))
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

export const updatePo = (query) => () => {
    return new Promise((resolve, reject) => {
        PurchaseOrderService.updatePo(query)
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

export const deletePo = (id) => () => {
    return new Promise((resolve, reject) => {
        PurchaseOrderService.deletePo(id)
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