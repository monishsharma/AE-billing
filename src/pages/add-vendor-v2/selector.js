
export const createInitialValueValidation = () => {
    return intialState.reduce((acc, item) => {
        if (!item.preventValidation) {
            acc[item.key] =  true;
        }
        return acc;
    }, {});
};

export const STEPS = {
    VENDOR_DETAIL: "vendorDetail",
    PLANT_DETAIL: "plantDetail",
    SUPPLY_RATE: "supplyRate"
}

export const VENDOR_STEPS = [
    {
        id: STEPS.VENDOR_DETAIL,
        label: "Vendor Detail"
    },
    {
        id: STEPS.PLANT_DETAIL,
        label: "Plant Detail"
    },
    {
        id: STEPS.SUPPLY_RATE,
        label: "Supply Rate"
    }
]