import baseApi from "./baseApi";
import billingApi from "./billing";

const billing = billingApi(baseApi);

export {
    baseApi,
    billing as BillingService
};
