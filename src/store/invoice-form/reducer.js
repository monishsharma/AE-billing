import { createReducer } from "reduxsauce";
import  Types from "./actionTypes";
import {STEPPER_NAME} from "../../constants/app-constant"
import { createInitialValue } from "../../components/steps/goods-description/selector";
import { addPAckagingcharge } from "../../helpers/round-off";


export const INITIAL_STATE = {
    [STEPPER_NAME.INVOICE_DETAILS]: {
        invoiceNO: "",
        invoiceDate: "",
        company: ""
    },
    [STEPPER_NAME.BUYER_DETAIL]: {
        customer: "",
        vendorCode: "",
        materialCode: ""
    },
    [STEPPER_NAME.GOODS_DESCRIPTION]: {
        po: "",
        serial: "",
        HSN: "",
        Total: 0,
        freight: 0,
        SGST: 0,
        CGST: 0,
        roundOff: 0,
        taxableValue: 0,
        items: [createInitialValue()]
    },
    [STEPPER_NAME.SHIPMENT_DETAIL]: {
        vehicleNo: "",
        eway: "",
        asn: ""
    },
    currentStep: 0
};

const generateSummary = (items, state) => {
    const freight = state[STEPPER_NAME.GOODS_DESCRIPTION].freight;
    const totalValue = items.reduce((total, item) => total + (parseFloat(item.value) || 0), 0);
    const sgstAmount = ((totalValue + freight) * 9 ) / 100;
    const roundOff = addPAckagingcharge(totalValue + freight + sgstAmount + sgstAmount );
    const billAmount = totalValue + freight + sgstAmount + sgstAmount + roundOff;
    return {
        taxableValue: (totalValue + freight).toFixed(2),
        Total: billAmount.toFixed(2),
        SGST: sgstAmount.toFixed(2),
        CGST: sgstAmount.toFixed(2),
        roundOff: roundOff.toFixed(2)
    };
}

const resettableValues = (state, data, stepName) => {
    const initialState = state[stepName];
    let isDataChanged = false;
    if (data.company || data.customer) {
        isDataChanged = Object.keys(data).some(key => {
            if (key === "company" || key=== "customer") {
                return data[key] !== initialState[key]
            }
        });
        // isDataChanged = Object.keys(data).some(
        //     key => data[key] !== initialState[key]
        // );
    }
    if (isDataChanged) {
        return {
            [STEPPER_NAME.GOODS_DESCRIPTION]: {
                ...INITIAL_STATE[STEPPER_NAME.GOODS_DESCRIPTION]
            },
            ...(data.company && {
                [STEPPER_NAME.BUYER_DETAIL]: {
                    ...INITIAL_STATE[STEPPER_NAME.BUYER_DETAIL]
                }
            }),
            [STEPPER_NAME.SHIPMENT_DETAIL]: {
                asn: "",
                vehicleNo: "",
                eway: ""
            }
        }
    }
}


export const getComputedValue = (data, state) => {
    if (data.items) {

        const computedValue = data.items.map((item) => ({
            ...item,
            value: (parseFloat(item.qty || 0) * parseFloat(item.rate || 0)).toFixed(2)
        }))
        return {items: computedValue, ...generateSummary(computedValue, state)}

    }
    if (data.freight !== undefined && data.freight !== null) {
        const freightValue = parseFloat(data.freight) || 0;
        const {
            [STEPPER_NAME.GOODS_DESCRIPTION]: {
                items
            }
        } = state;
        const totalItemsValue = items.reduce((total, item) => total + (parseFloat(item.value) || 0), 0);
        const totalTaxValue = parseFloat(totalItemsValue) + parseFloat(freightValue);
        const sgstAmount = (totalTaxValue * 9) / 100;
        const roundOff = addPAckagingcharge(totalTaxValue + sgstAmount + sgstAmount );

        return {
            freight: freightValue,
            taxableValue: totalTaxValue,
            Total: (totalTaxValue + sgstAmount + sgstAmount + roundOff).toFixed(2),
            SGST: sgstAmount.toFixed(2),
            CGST: sgstAmount.toFixed(2),
            roundOff: roundOff.toFixed(2)

        }
    }
    return data;
}



export const setData = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        ...data,
    }
};

export const saveData = (state = INITIAL_STATE, { stepName, data }) => {
    return {
        ...state,
        ...resettableValues(state, data, stepName),
        [stepName]: {
            ...state[stepName],
            ...getComputedValue(data, state),
        },
    }
};

export const saveApiData = (state = INITIAL_STATE, { data }) => {
    return {
        ...state,
        ...data
    }
};

export const setCurrentStep = (state = INITIAL_STATE, { step }) => {
    return {
        ...state,
        currentStep: step,
    }
};

export const resetReducer = (state = INITIAL_STATE) => {
    return {
        ...INITIAL_STATE,
    }
};



export const HANDLERS = {
    [Types.SET_FORM]: setData,
    [Types.SAVE_DATA]: saveData,
    [Types.SET_ACTIVE_STEP]: setCurrentStep,
    [Types.RESET_REDUCER]: resetReducer,
    [Types.SAVE_API_dATA]: saveApiData

};


export default createReducer(INITIAL_STATE, HANDLERS);
