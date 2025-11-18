import TextField from '@mui/material/TextField';
import moment from 'moment';
import { STEPPER_NAME } from '../../../constants/app-constant';

// Define the INPUTS array with each field's configuration
export const INPUTS = [

    {
        id: "vehicleNo",
        name: "Vehicle No",
        placeholder: "Vehicle No",
        type: "textField",
        key: "vehicleNo",
        component: TextField
    },
    {
        id: "eway",
        name: "Eway Bill No",
        placeholder: "Eway Bill No",
        type: "textField",
        key: "eway",
        component: TextField,
        extraProps: {}
    },
];

const formatDate = (dateStr) => moment(dateStr, "YYYY-MM-DD").format("DD MMM YYYY");


export const getPayloadForASN = ({invoiceDetail, asnNumber = ""}) => {

    const {
        [STEPPER_NAME.INVOICE_DETAILS]: {
            invoiceNO,
            invoiceDate
        },
        [STEPPER_NAME.GOODS_DESCRIPTION]: {
            po
        },
        [STEPPER_NAME.SHIPMENT_DETAIL]: {
            vehicleNo,
            eway
        }
    } = invoiceDetail;
    return {
        items: {
            "vStatus": "GA",
            // "vStatus": finalStep ? "CA":"GA",
            "ASN": asnNumber ?  asnNumber : "0",
            "INVOICE_NO": invoiceNO,
            "dtINVOICE": formatDate(invoiceDate),
            "PONumber": po,
            "TRANSPORT_NAME": "N/A",
            "DRIVER_NAME": "N/A",
            "DRIVER_CONTNO": "N/a",
            "VEHICLE_NO": vehicleNo,
            "LR_NO": "N/A",
            "dtLR_DATE": formatDate(invoiceDate),
            "EwayBillNo": eway || "N/A",
            "dtEwayBillDate": formatDate(invoiceDate),
            "SRN_XML": "<SRN></SRN>",
            "NONCTQ_XML": "<SRNITEM></SRNITEM>"
        }
    }
}