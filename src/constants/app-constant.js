export const COMPANY_TYPE = {
    ASHOK: "ASHOK",
    PADMA: "PADMA",
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
        GSTIN: "23AQGPS4032C1Z3",
        PAN: "AQGPS4032C",
        value: COMPANY_TYPE.ASHOK,
        address: "Goyal Compound Industrial Area Hazira, Gwalior, Madhya Pradesh, India - 474004",
        paymentTerms: "2 Day BDS",
        tin: "23495207141",
        htmlContent:`
        <ul style="margin: 0; text-align: left; padding-left: 20px; list-style-type: decimal; line-height: 1.5;">
        <li>STATE BANK OF INDIA (SME BRANCH PATANKAR BAZAR LASHKAR)<br />A/C NO: 63008044566 <br/> IFSC CODE: SBIN0030119</li>
        <li>Goods once sold will not be back</li>
        <li>Subject to Gwalior jurisdiction only</li>
        </ul>`,
        vendorList: {
            [VENDOR_NAME.CROMPTON]: {
                name: "Crompton Greaves Power and Industrial Solution LTD",
                address : "T2 MALANPUR MFG PLANT INDUSTRIAL AREA MALANPUR DISTRICT BHIND (M.P)",
                GSTIN: "23AAACC384OK3ZV",
                label: "CROMPTON",
                PAN: "AAACC384OK",
                isInterState: false,
                value: VENDOR_NAME.CROMPTON,
                materialCode: 283051012,
                vendorCode: 10000943,
                supplyRate: [
                    {
                        type: "LPT",
                        rate: 116.525,
                        description: "Core Frame Assembly"
                    },
                    {
                        type: "PAUWELS",
                        rate: 119.4875,
                        description: "Core Frame Assembly"
                    },
                    {
                        type: "CHANNEL",
                        rate: 118.00625,
                        description: "Core Frame Assembly"
                    },
                    {
                        type: "380 FLANGE/PLAIN",
                        rate: "27650",
                        description: "Core Frame Assembly"
                    },
                    {
                        type: "300 FLANGE/PLAIN",
                        rate: "15454.38"
                    },
                    {
                        type: "300 PAINT FLANGE / PLAIN",
                        rate: "16226.60"
                    },
                    {
                        type: "300 bearing",
                        rate: "21255.94"
                    },
                    {
                        type: "250 FLANGE",
                        rate: "6813.75"
                    },
                    {
                        type: "250 PLAIN",
                        rate: "7208.75"
                    },
                    {
                        type: "200 PLAIN",
                        rate: "2203.11"
                    },
                    {
                        type: "200 FLANGE",
                        rate: "4986.87"
                    },
                    {
                        type: "150 PLAIN",
                        rate: "839.37"
                    },
                    {
                        type: "125 PLAIN",
                        rate: "592.50"

                    }
                ]
            },
        }
    },
    [COMPANY_TYPE.PADMA]:{
        name: "Padma Engineering Works",
        GSTIN: "23CZSPS9067G1ZL",
        PAN: "CZSPS9067G",
        value: COMPANY_TYPE.PADMA,
        paymentTerms: "",
        tin: "23265203048",
        htmlContent:`
        <ul style="margin: 0; text-align: left; padding-left: 20px; list-style-type: decimal; line-height: 1.5;">
        <li>HDFC Bank (Kanti Nagar Gwalior, MP, 474002)<br />A/C NO: 50200047766504 <br/> IFSC CODE: HDFC0009437</li>
        <li>Subject to Gwalior jurisdiction only</li>
        </ul>`,
        address: "Near Railway Hockey Stadium Loko Road, Gwalior, Madhya Pradesh, INdia - 474004",
        vendorList: {
            [VENDOR_NAME.TELAWNE_TALOJA] :{
                name: "TELAWNE POWER EQUIPMENT(P)LTd",
                address : "D-23, Taloja MIDC, Taloja Industrial Area Navi Mumbai, Maharashtra, India -410208",
                GSTIN: "27AACCT0358D1ZM",
                PAN: "AACCT0358D",
                value: VENDOR_NAME.TELAWNE_TALOJA,
                isInterState: true,
                materialCode: "",
                label: "TELAWNE TALOJA",
                state: "MAHARASHTRA",
                stateCode: 27,
                vendorCode: "CRPLED1066",
                supplyRate:[
                    {
                        type: "6 inch plain",
                        rate: 980,
                    },
                    {
                        type: "8 inch plain",
                        rate: 4285,
                    },
                    {
                        type: "8 inch rail",
                        rate: 4285,
                    },
                    {
                        type: "10 inch plain",
                        rate: 11850,
                    },
                    {
                        type: "10 inch rail",
                        rate: 11850,
                    },
                ]
            },
            [VENDOR_NAME.TELAWNE_RABALE] :{
                name: "TELAWNE POWER EQUIPMENT(P)LTd",
                address : "R-457, MIDC, RABALE, THANE BELAPUR ROAD Navi Mumbai, Maharashtra, India -410208",
                GSTIN: "27AACCT0358D1ZM",
                PAN: "AACCT0358D",
                value: VENDOR_NAME.TELAWNE_RABALE,
                label: "TELAWNE RABALE",
                materialCode: "",
                isInterState: true,
                state: "MAHARASHTRA",
                stateCode: 27,
                vendorCode: "CRPLED1066",
                supplyRate:[
                    {
                        type: "6 inch plain",
                        rate: 980,
                    },
                    {
                        type: "8 inch plain",
                        rate: 4285,
                    },
                    {
                        type: "8 inch rail",
                        rate: 4285,
                    },
                    {
                        type: "10 inch plain",
                        rate: 11850,
                    },
                    {
                        type: "10 inch rail",
                        rate: 11850,
                    }
                ]
            },
            [VENDOR_NAME.TELAWNE_AMBERNATH] :{
                name: "TELAWNE POWER EQUIPMENT(P)LTd",
                address : "M2 PALEGAON NEAR RANGOLI HOTEL AMBERNATH MAHARASHTRA,421501, INDIA",
                GSTIN: "27AACCT0358D1ZM",
                PAN: "AACCT0358D",
                isInterState: true,
                label: "TELAWNE AMBERNATH",
                state: "MAHARASHTRA",
                stateCode: 27,
                value: VENDOR_NAME.TELAWNE_AMBERNATH,
                materialCode: "",
                vendorCode: "CRPLED1066",
                supplyRate:[
                    {
                        type: "6 inch plain",
                        rate: 980,
                    },
                    {
                        type: "8 inch plain",
                        rate: 4285,
                    },
                    {
                        type: "8 inch rail",
                        rate: 4285,
                    },
                    {
                        type: "10 inch plain",
                        rate: 11850,
                    },
                    {
                        type: "10 inch rail",
                        rate: 11850,
                    }
                ]
            },
            [VENDOR_NAME.ATLANTA_BANGLORE]: {
                name: "M/S ATLANTA ELECTRICALS LIMITED				",
                address : "PLOT NO 1 SURVEY NO 96-14-115-116,BASHETTYHLLI,VILLAGE,KASABA HOBLI,DODDABALLAPUR TALIK BANGLORE- 561203   KARNATAKA",
                GSTIN: "29AABCA6647B1ZU",
                PAN: "AABCA6647B",
                value: VENDOR_NAME.ATLANTA_BANGLORE,
                materialCode: "",
                vendorCode: "VEND-D-00280",
                state: "BANGLORE",
                isInterState: true,
                label: "ATLANTA BANGLORE",
                stateCode: 27,
                supplyRate:[
                    {
                        type: "270 Flange",
                        rate: 8000,
                    },
                    {
                        type: "320 Flange",
                        rate: 17600,
                    }
                ]
            },
            [VENDOR_NAME.ATLANTA_AANAND]: {
                name: "M/S ATLANTA ELECTRICALS LIMITED				",
                address : "PLOT NO-1503-04,GIDC ESTATE,PHASE-IV,VITTHAL UDYOGNAGAR,	ANAND  388121 (GUJRAT)",
                GSTIN: "24AABCA6647B1Z4",
                state: "GUJARAT",
                stateCode: 24,
                label: "ATLANTA AANAND",
                isInterState: true,
                PAN: "AABCA6647B",
                value: VENDOR_NAME.ATLANTA_AANAND,
                materialCode: "",
                vendorCode: "VEND-D-00280",
                supplyRate:[
                    {
                        type: "270 Flange",
                        rate: 8000,
                    },
                    {
                        type: "320 Flange",
                        rate: 17600,
                    }
                ]
            }
        }
    }
}


export const STEPPER_NAME = {
    INVOICE_DETAILS: "invoiceDetail",
    BUYER_DETAIL: "buyerDetail",
    GOODS_DESCRIPTION: "goodsDescription",
    SHIPMENT_DETAIL: "shippingDetail"
}

