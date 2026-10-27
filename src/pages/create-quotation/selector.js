import TextField from '@mui/material/TextField';
import SelectVendor from '../../components/select-vendor';
import { COMPANY, COMPANY_TYPE, QUOTATION_FIELDS, QUOTATION_STEPPER_NAME, STEPPER_NAME } from '../../constants/app-constant';
import { isMobileDevice } from '../../helpers/is-mobile-device';
import { getStateInfo } from '../../helpers/customer-detail';
import { capitalize } from '../../helpers/capitalize';

export const INPUTS = [
    {
        id: QUOTATION_FIELDS.QUOTATION_COMPANY,
        name: QUOTATION_FIELDS.QUOTATION_COMPANY,
        placeholder: "Company",
        type: "select",
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        key: QUOTATION_FIELDS.QUOTATION_COMPANY,
        component: TextField,
        optionsFrom: "companyType",
        extraProps: {
            select: true,
            disableOnEdit: true
        },
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_NO,
        name: QUOTATION_FIELDS.QUOTATION_NO,
        placeholder: "Quotation No",
        type: "textField",
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        key: QUOTATION_FIELDS.QUOTATION_NO,
        component: TextField,
        extraProps: {
            disableOnEdit: true
        },
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_CUSTOMER,
        name: "customer",
        placeholder: "Customer",
        type: "select",
        key: QUOTATION_FIELDS.QUOTATION_CUSTOMER,
        stepName: QUOTATION_STEPPER_NAME.BUYER_DETAIL,
        component: SelectVendor,
        customComponent: true,
        disabledProp: true,
        extraProps: {
            select: true,
            disabledCondition: (quotationCompany) => !quotationCompany,
        },
        optionsFrom: "vendorList"
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_BRANCH,
        name: "branch",
        placeholder: "Branch",
        type: "select",
        key: QUOTATION_FIELDS.QUOTATION_BRANCH,
        stepName: QUOTATION_STEPPER_NAME.BUYER_DETAIL,
        component: TextField,
        disabledProp: true,
        extraProps: {
            select: true,
            // disabledCondition: (buyerDetail) => !buyerDetail?.customer,
        },
        optionsFrom: "branches"
    },

    {
        id: QUOTATION_FIELDS.QUOTATION_DATE,
        name: QUOTATION_FIELDS.QUOTATION_DATE,
        placeholder: "Invoice Date",
        type: "textField",
        key: QUOTATION_FIELDS.QUOTATION_DATE,
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        component: TextField,
        extraProps: {
            type: "date",
            slotProps: {
                inputLabel: {
                    shrink: true
                },
            },
        },
    },
    {
        id: QUOTATION_FIELDS.QUOTATION_TYPE,
        name: QUOTATION_FIELDS.QUOTATION_TYPE,
        placeholder: "Quotation Type",
        type: "textField",
        key: QUOTATION_FIELDS.QUOTATION_TYPE,
        stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
        component: TextField,
        extraProps: {
            select: true,
        },
        optionsFrom: "quotationTypeList"
    },

];

export const columns = [
    {
        id: 'sno',
        label: `${isMobileDevice() ? "Items" : "S.No"}`,
        class: ""
    },
    {
        id: 'Description',
        label: "Description",
        class: true
    },
    {
        id: 'Rate',
        label: "Rate",
        class: ""
    },
    {
        id: 'drawingNO',
        label: "Drawing No",
        class: ""
    }
];

export const ITEMS_INPUT = [
    {
        id: 'sno',
        name: 'sno',
        placeholder: "S.No",
        initialValue: "",

    },
    {
        id: 'description',
        name: 'description',
        placeholder: "Item Description",
        initialValue: "",
        extraProps: {
            multiline: true
        }
    },
    {
        id: 'rate',
        name: 'rate',
        placeholder: "Rate",
        initialValue: "",
        extraProps: {
            type: "number"
        }
    },
    {
        id: 'drawingNo',
        name: 'drawingNo',
        placeholder: "Drawing No",
        initialValue: "",

    }
]

export const createInitialValue = () => {
    return ITEMS_INPUT.reduce((acc, item) => {
        acc[item.name] = item.initialValue;
        return acc;
    }, {});
}

export const createInitialValueValidation = () => {
    return ITEMS_INPUT.reduce((acc, item) => {
        acc[item.name] = true;
        return acc;
    }, {});
}

const prepareGoodsDescriptionItems = (items) => {
    return items.map(({description, rate, drawingNo, qty = 0, ...rest}, index) => ({
        sno: index + 1,
        description: description || "",
        rate: rate || "",
        qty : qty || 0,
        value: 0,
        wo: drawingNo || "",
        quotationItemId: rest?._id || "",
    }));
}

export const getMaterialCode = (materialTypeList, quotationType) => {
    const material = materialTypeList.values.find((item) => item?.type?.toLowerCase() === quotationType.toLowerCase());
    return material ? material.code : "asd";
};

export const prepareInvoiceData = (quotationData, selectedItems, nextInvoiceNo, materialTypeList) => {

    const { quotationDetail, buyerDetail, _id } = quotationData;
    const {
        quotationType,
        quotationCompany: company,
    } = quotationDetail;

    const {vendorList, ...otherData} = COMPANY[company] || {};

    const invoiceData = {
        company,
        paid: false,
        currentStep: 0,
        referenceQuotation: _id,
        [STEPPER_NAME.INVOICE_DETAILS]: {
            ...otherData,
            company,
            invoiceNO: nextInvoiceNo,
            invoiceDate: new Date().toISOString().split('T')[0],
            quotationReference: _id,
        },
        [STEPPER_NAME.BUYER_DETAIL]: {
            ...buyerDetail,
            isTemporary: false,
            orderType: capitalize(quotationType),
            materialCode: getMaterialCode(materialTypeList, quotationType),
            stateCode: getStateInfo(buyerDetail?.GSTIN)?.code || "",
        },
        [STEPPER_NAME.GOODS_DESCRIPTION] : {
            po: "",
            serial: "",
            HSN: "",
            Total: 0,
            freight: 0,
            SGST: 0,
            CGST: 0,
            roundOff: 0,
            taxableValue: 0,
            items: prepareGoodsDescriptionItems(selectedItems),
        },
        [STEPPER_NAME.SHIPMENT_DETAIL]: {
            vehicleNo: "",
            eway: "",
            asn: ""
        },
    }

    return invoiceData;
}