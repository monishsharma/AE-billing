import baseApi from "./baseApi";
import billingApi from "./billing";
import asnAPI from "./asn";
import quotationApi from "./quotation";

const billing = billingApi(baseApi);
const ASN = asnAPI(baseApi);
const Quotation = quotationApi(baseApi);

export {
    baseApi,
    billing as BillingService,
    ASN as ASNService,
    Quotation as QuotationService
};
