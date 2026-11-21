import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { STEPS } from './stepper'
import { useParams } from 'react-router-dom'

const AddVendorStepper = ({
    config,
    saveDataConnect,
    updateVendorConnect,
    setCurrentStepConnect,
    getVendorListConnect,
    updateVendorListConnect,
    resetVendorFormConnect
}) => {

    const {id = ""} = useParams();
    const {vendorForm} = config
    const {currentStep} = vendorForm;
    const stepRefs = React.useRef([]);

    React.useEffect(() => {
        // Delay scroll to allow expand animation to finish
        const timeout = setTimeout(() => {
          const el = stepRefs.current[currentStep];
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 500); // adjust 300–500ms for smoother sync with MUI animation

        return () => clearTimeout(timeout);
      }, [currentStep]);

    const nextStep = () => setCurrentStepConnect({step: Number(currentStep) + 1});

    const prevStep = () => setCurrentStepConnect({step: Number(currentStep) - 1});

    const jumpToStep = (index) => {
        if(id) {
            setCurrentStepConnect({step: index})
        }
    }


    return (
        <>
            <Stepper
                activeStep={currentStep}
                orientation="vertical"
                sx={{
                    '& .MuiStepIcon-root': {
                        color: id ? 'black' : 'gray', // Change color for active step
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
                    <Step ref={(el) => (stepRefs.current[index] = el)} key={step.id}>
                        <StepLabel onClick={() => jumpToStep(index)}>
                            <Typography  variant="h5" color="text.primary">
                                {step.label}
                            </Typography>
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
                                getVendorList={getVendorListConnect}
                                resetVendorFormConnect={resetVendorFormConnect}
                                updateVendorConnect={updateVendorConnect}
                                updateVendorList={updateVendorListConnect}
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