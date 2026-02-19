export const COMPANY_TYPE = {
    ASHOK: "ASHOK",
    PADMA: "PADMA",
}

export const DASHBOARD_TAB_TYPE = {
    MONTHLY: "MONTHLY",
    YEARLY: "YEARLY",
}

export const VENDOR_NAME = {
    CROMPTON: "Crompton Greaves",
    ATLANTA_AANAND: "ATLANTA_AANAND",
    ATLANTA_BANGLORE: "ATLANTA_BANGLORE",
    TELAWNE_TALOJA: "TELAWNE_TALOJA",
    TELAWNE_RABALE: "TELAWNE_RABALE",
    TELAWNE_AMBERNATH: "TELAWNE_AMBERNATH",
    RAJASTHAN_EXPLOSIVES_AND_CHEMICALS_LTD: "Rajasthan Explosives",
    PARINAMITRA_ELECTRICALS: "Parinamitra Electricals"
};

export const COMPANY  = {
    [COMPANY_TYPE.ASHOK]: {
        name: "Ashok Enterprises",
        GSTIN: "23AQGPS4032C1ZA",
        PAN: "AQGPS4032C",
        value: COMPANY_TYPE.ASHOK,
        address: "Goyal Compound Industrial Area Hazira, Gwalior, Madhya Pradesh, India - 474004",
    },
    [COMPANY_TYPE.PADMA]:{
        name: "Padma Engineering Works",
        GSTIN: "23CZSPS9067G1ZL",
        PAN: "CZSPS9067G",
        value: COMPANY_TYPE.PADMA,
        address: "Near Railway Hockey Stadium Loko Road, Gwalior, Madhya Pradesh, INdia - 474004",
    }
}

export const CG_URL = "https://itapps.cgglobal.com/CGSCM/report/frmInvoiceChallan.aspx?ASN="

export const STEPPER_NAME = {
    INVOICE_DETAILS: "invoiceDetail",
    BUYER_DETAIL: "buyerDetail",
    GOODS_DESCRIPTION: "goodsDescription",
    SHIPMENT_DETAIL: "shippingDetail",
    GENERATE_ASN: "GENERATE_ASN"
}

export const QUOTATION_STEPPER_NAME = {
    QUOTATION_DETAIL: "quotationDetail",
    GOODS_DESCRIPTION: "goodsDescription",
    BUYER_DETAIL: "buyerDetail",
}

export const QUOTATION_FIELDS ={
    QUOTATION_NO: "quotationNo",
    QUOTATION_DATE: "quotationDate",
    QUOTATION_COMPANY: "quotationCompany",
    QUOTATION_CUSTOMER: "customer",
};

export const DEFAULT_TERMS_AND_CONDITION = `
    <ol>
      <li>RATES ARE EX-GO DOWN GWALIOR</li>
      <li>ALL MEASUREMENT AS PER I.S METHOD</li>
      <li>GST AS PER ACTUAL (18% EXTRA)</li>
      <li>VALIDITY OF OFFER 10 DAYS</li>
    </ol>
  `;