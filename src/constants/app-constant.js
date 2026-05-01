export const COMPANY_TYPE = {
    ASHOK: "ASHOK",
    PADMA: "PADMA",
}

export const DASHBOARD_TAB_TYPE = {
    MONTHLY: "MONTHLY",
    FINANCIAL_YEAR: "YEARLY",
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
    QUOTATION_BRANCH:"branch",
    QUOTATION_TYPE: "quotationType",
};

export const PURCHASE_ORDER_FIELDS = {
    PO_NUMBER: "poNumber",
    PO_DATE: "poDate",
    PO_COMPANY: "company",
    PO_CUSTOMER: "customer",
    TOTAL_VALUE: "totalValue"

}

export const DEFAULT_TERMS_AND_CONDITION = `
    <ol>
      <li>RATES ARE EX-GO DOWN GWALIOR</li>
      <li>ALL MEASUREMENT AS PER I.S METHOD</li>
      <li>GST AS PER ACTUAL (18% EXTRA)</li>
      <li>VALIDITY OF OFFER 10 DAYS</li>
    </ol>
  `;

  export const STATUS_FILTER = [
    {
        label: "All",
        value: "ALL",
        id: 1,
        color: "#1a237e"
    },
    {
        label: "Pending",
        value: "PENDING",
        id: 2,
        color: "#ED6C02"
    },
    {
        label: "Completed",
        value: "COMPLETED",
        id: 3,
        color: "#4caf50"
    },

];

export const PO_TYPES = ["FRAME", "ROLLER", "BAKELITE", "OTHERS"];
export const FILTER_OPTION = [
    {
        label: "ALL",
        id: 1
    },
    {
        label: "FRAME",
        id: 2
    },
    {
        label: "ROLLER",
        id: 3
    },
    {
        label: "BAKELITE",
        id: 4
    },
    {
        label: "OTHERS",
        id: 5
    }
];

export const orderTypeOptions = [
                { value: "Roller", label: "Roller", vCode: "280000052" },
                { value: "Frame", label: "Frame", vCode: "283051012" },
                { value: "Bakelite", label: "Bakelite", vCode: "320007177" },
                { value: "Others", label: "Others", vCode: "" },
]

export const VENDOR_STEPS = {
    VENDOR_DETAIL: "vendorDetail",
    PLANT_DETAIL: "plantDetail",
    SUPPLY_RATE: "supplyRate"
};


export const gstinStateCodes = [
    { code: '01', state: 'Jammu & Kashmir' },
    { code: '02', state: 'Himachal Pradesh' },
    { code: '03', state: 'Punjab' },
    { code: '04', state: 'Chandigarh' },
    { code: '05', state: 'Uttarakhand' },
    { code: '06', state: 'Haryana' },
    { code: '07', state: 'Delhi' },
    { code: '08', state: 'Rajasthan' },
    { code: '09', state: 'Uttar Pradesh' },
    { code: '10', state: 'Bihar' },
    { code: '11', state: 'Sikkim' },
    { code: '12', state: 'Arunachal Pradesh' },
    { code: '13', state: 'Nagaland' },
    { code: '14', state: 'Manipur' },
    { code: '15', state: 'Mizoram' },
    { code: '16', state: 'Tripura' },
    { code: '17', state: 'Meghalaya' },
    { code: '18', state: 'Assam' },
    { code: '19', state: 'West Bengal' },
    { code: '20', state: 'Jharkhand' },
    { code: '21', state: 'Odisha' },
    { code: '22', state: 'Chhattisgarh' },
    { code: '23', state: 'Madhya Pradesh' },
    { code: '24', state: 'Gujarat' },
    { code: '25', state: 'Daman and Diu' },
    { code: '26', state: 'Dadra and Nagar Haveli' },
    { code: '27', state: 'Maharashtra' },
    { code: '28', state: 'Andhra Pradesh (Old)' },
    { code: '29', state: 'Karnataka' },
    { code: '30', state: 'Goa' },
    { code: '31', state: 'Lakshadweep' },
    { code: '32', state: 'Kerala' },
    { code: '33', state: 'Tamil Nadu' },
    { code: '34', state: 'Puducherry' },
    { code: '35', state: 'Andaman and Nicobar Islands' },
    { code: '36', state: 'Telangana' },
    { code: '37', state: 'Andhra Pradesh (New)' },
    { code: '38', state: 'Ladakh' },
    { code: '97', state: 'Other Territory' }
  ];


  // get gstin details based on state code
  export const getCustomerGSTINDetail = (gstin) => {
    const stateCode = gstin.substring(0, 2);
    const stateDetail = gstinStateCodes.find(item => item.code === stateCode);
    return {
        state: stateDetail ? stateDetail.state : "",
        PAN: gstin.substring(2, 12),
        code: stateCode
     }
  }
