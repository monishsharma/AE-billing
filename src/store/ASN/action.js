import { ASNService } from "../../services";
import Types from "./actionTypes";
import Swal  from "sweetalert2";


export const generateASN = ({poNumber, invoiceId, payload}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.generateASN({poNumber, invoiceId, payload})
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

export const checkASNExist = ({poNumber, invoiceId}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.checkASNExist({poNumber, invoiceId})
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
};