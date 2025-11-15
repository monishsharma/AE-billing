import baseApi from "./baseApi";
import billingApi from "./billing";
import asnAPI from "./asn"

const billing = billingApi(baseApi);
const ASN = asnAPI(baseApi);

export {
    baseApi,
    billing as BillingService,
    ASN as ASNService
};
