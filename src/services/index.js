import baseApi from "./baseApi";
import billingApi from "./billing";
import asnAPI from "./asn";
import quotationApi from "./quotation";
import purchaseOrderApi from "./purchase-order";
import configApi from "./config";

const billing = billingApi(baseApi);
const ASN = asnAPI(baseApi);
const Quotation = quotationApi(baseApi);
const PurchaseOrder = purchaseOrderApi(baseApi);
const Config = configApi(baseApi);
export {
    baseApi,
    billing as BillingService,
    ASN as ASNService,
    Quotation as QuotationService,
    Config as ConfigService,
    PurchaseOrder as PurchaseOrderService
};
