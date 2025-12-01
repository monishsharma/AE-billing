import { ASNService } from "../../services";
import Types from "./actionTypes";
import Swal  from "sweetalert2";


export const generateASN = ({poNumber, payloadBody}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.generateASN({poNumber, payloadBody})
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

export const checkASNExist = ({poNumber, payload}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.checkASNExist({poNumber, payload})
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

export const getPODetail = ({poNumber}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.getPODetail({poNumber})
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