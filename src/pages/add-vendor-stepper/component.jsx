import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import React, { use } from 'react'
import { STEPS } from './stepper'
import { useParams } from 'react-router-dom'

const AddVendorStepper = ({
    config,
    saveDataConnect,
    updateVendorConnect,
    setCurrentStepConnect
}) => {

    const {id = ""} = useParams();
    const {vendorForm} = config
    const {currentStep} = vendorForm;

    const nextStep = () => setCurrentStepConnect({step: Number(currentStep) + 1});

    const prevStep = () => setCurrentStepConnect({step: Number(currentStep) - 1});


    return (
        <>
            <Stepper
                activeStep={currentStep}
                orientation="vertical"
                sx={{
                    '& .MuiStepIcon-root': {
                        color: 'gray', // Change color for active step
                    },
                    '& .MuiStepIcon-root.Mui-active': {
                    color: 'black', // Color for the active step
                    },
                    '& .MuiStepIcon-root.Mui-completed': {
                    color: 'black', // Color for the active step
                    },
                }}
            >
                {STEPS.map((step, index) => (
                    <Step key={step.id}>
                        <StepLabel onClick={() => jumpToStep(index)}>
                            <Typography  variant="h5">{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                            <step.component
                                id={id}
                                index={index}
                                steps={STEPS}
                                nextStep={nextStep}
                                prevStep={prevStep}
                                currentStep={currentStep}
                                vendorForm={vendorForm}
                                saveData={saveDataConnect}
                                updateVendorConnect={updateVendorConnect}
                                setCurrentStepConnect={setCurrentStepConnect}
                            />
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default AddVendorStepper