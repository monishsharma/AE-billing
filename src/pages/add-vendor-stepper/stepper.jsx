import VendorDetails from "../../components/vendor-steps/vendor-detail";
import VendorPlantDetails from "../../components/vendor-steps/vendor-plant-detail";
import VendorSupplyRates from "../../components/vendor-steps/vendor-supply-rates";
import { VENDOR_STEPS } from "../../constants/app-constant";



export const STEPS = [
    {
        id: VENDOR_STEPS.VENDOR_DETAIL,
        label: "Vendor Detail",
        component: VendorDetails
    },
    {
        id: VENDOR_STEPS.PLANT_DETAIL,
        label: "Plant Detail",
        component: VendorPlantDetails
    },
    {
        id: VENDOR_STEPS.SUPPLY_RATE,
        label: "Supply Rate",
        component: VendorSupplyRates
    }
]