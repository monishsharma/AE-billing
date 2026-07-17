import React from 'react';
import AddVendorStepper from '../add-vendor-stepper';


const AddVendorV2 = ({
    getVendorListConnect
}) => {


    return (
        <div>
            <div className="mt-4">
                <h2 className="fw-bold">Add Customer</h2>
                <div className="mt-4">
                    <AddVendorStepper
                        getVendorList={getVendorListConnect}
                    />
                </div>
            </div>
        </div>
    )
}

export default AddVendorV2