import React from 'react';
import { getCustomerGSTINDetail } from '../../helpers/customer-detail';
import AddVendorStepper from '../add-vendor-stepper';


const AddVendorV2 = () => {


    const onFieldChange = ({ event }) => {
        const { name, value } = event.target;
        if (name === "GSTIN") {
            const {GSTIN,PAN} = getCustomerGSTINDetail(value);
            console.log(GSTIN, PAN)
        }
        console.log(name, value);

        // setVendorFormData((prevData) => ({
    }

    return (
        <div>
            <div className="mt-4">
                <h2 className="fw-bold">Add Customer</h2>
                <div className="mt-4">
                    <AddVendorStepper />
                </div>
            </div>
        </div>
    )
}

export default AddVendorV2