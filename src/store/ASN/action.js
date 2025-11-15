import { ASNService } from "../../services";
import Types from "./actionTypes";
import Swal  from "sweetalert2";


export const generateASN = ({poNumber, invoiceId}) => () => {
    return new Promise((resolve, reject) => {
        ASNService.generateASN({poNumber, invoiceId})
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