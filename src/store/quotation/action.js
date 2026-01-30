import Swal from "sweetalert2";
import { BillingService, QuotationService } from "../../services";
import Types from "./actionTypes";

const saveData = ({ stepName, data }) => ({
    type: Types.SAVE_DATA,
    stepName,
    data
});

const setData = ({ data }) => ({
    type: Types.SET_QUOTATION_CONFIG,
    data
});

const resetReducer = () => ({
    type: Types.RESET_REDUCER,
});

const setApiData = ({data}) => ({
    type: Types.SET_API_DATA,
    data
})

  const saveQuotation = (payload) => () => {
    return new Promise((resolve, reject) => {
        QuotationService.saveQuotation(payload)
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

  const getQuotation = ({company}) => () => {
    return new Promise((resolve, reject) => {
        QuotationService.getQuotation({company})
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

   const getQuotationById = ({id}) => (dispatch) => {
    return new Promise((resolve, reject) => {
        QuotationService.getQuotation({id})
        .then((res) => {
            resolve(res.data);
            dispatch(setApiData({data: res.data}))
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
    const getConfig = () => (dispatch) => {
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

export {
    saveData,
    getConfig,
    resetReducer,
    getQuotation,
    saveQuotation,
    getQuotationById
}