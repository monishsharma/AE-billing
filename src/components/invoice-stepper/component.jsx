import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InvoiceDetail from "../steps/invoice-detail"
import BuyerDetail from '../steps/buyer-detail';
import GoodsDescription from "../steps/goods-description";
import { STEPPER_NAME } from '../../constants/app-constant';
import ShippingDetails from "../steps/shipping-detail";
import { useParams } from 'react-router-dom';
import PageLoader from '../page-loader';

const steps = [
  {
    label: 'Invoice Detail',
    stepName: STEPPER_NAME.INVOICE_DETAILS,
    component: InvoiceDetail
  },
  {
    label: 'Buyer Detail',
    stepName: STEPPER_NAME.BUYER_DETAIL,
    component: BuyerDetail
  },
  {
    label: 'Good Description',
    stepName: STEPPER_NAME.GOODS_DESCRIPTION,
    component: GoodsDescription
  },
  {
    label: 'Shipping Detail',
    stepName: STEPPER_NAME.SHIPMENT_DETAIL,
    component: ShippingDetails
  },

];

export default function InvoiceStepper({
    invoiceForm,
    saveDataConnect,
    getConfigConnect,
    setCurrentStepConnect,
    getInvoiceListConnect,
    saveApiDataConnect,
    getHsnCodeListConnect
}) {

  const {currentStep, invoiceDetail, buyerDetail, goodsDescription, shippingDetail} = invoiceForm;

      const { id } = useParams();

  const [activeStep, setActiveStep] = React.useState(currentStep);
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    getConfigConnect();
    getHsnCodeListConnect();
  }, [getConfigConnect, getHsnCodeListConnect])

  React.useEffect(() => {
    if (id) {
    setIsLoading(true);

      getInvoiceListConnect({id})
      .then((res) => {
          saveApiDataConnect({
              data: {
                  currentStep: 0,
                  ...res
              }
          });
        setIsLoading(false);

      })
      .catch(() => {
        setIsLoading(false);
      })
    }

  }, [id])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStepConnect({
        step: activeStep - 1
    })
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentStepConnect({
        step: activeStep + 1
    })
  };

  const handleReset = () => {
    setActiveStep(0);
    getConfigConnect();
  };

  const getSubtitle = (stepName) => {
    if (stepName === STEPPER_NAME.INVOICE_DETAILS) {
      return `${invoiceDetail.company} - ${invoiceDetail.invoiceNO}`;
    }
    if (stepName === STEPPER_NAME.BUYER_DETAIL) {
      return `${buyerDetail.customer}`;
    }
    if (stepName === STEPPER_NAME.GOODS_DESCRIPTION) {
      return `PO - ${goodsDescription.po}`;
    }
  }

  const isStepCompleted = (step) => {

    switch (step.stepName) {
      case STEPPER_NAME.INVOICE_DETAILS:
        return Boolean(invoiceDetail?.invoiceNO);
      case STEPPER_NAME.BUYER_DETAIL:
        return Boolean(buyerDetail?.materialCode);
      case STEPPER_NAME.GOODS_DESCRIPTION:
        return Boolean(goodsDescription?.po);
      case STEPPER_NAME.SHIPMENT_DETAIL:
        return Boolean(shippingDetail?.vehicleNo);
      default:
        return false;
    }
  };

  const jumpToStep = (stepIndex) => {
    // allow jump only if all previous steps are completed
    const canJump = steps.slice(0, stepIndex).every((s, i) => isStepCompleted(s, i));

    if (canJump) {
      setActiveStep(stepIndex);
      setCurrentStepConnect({ step: stepIndex });
    } else {
      console.warn("You can't jump ahead, previous steps incomplete");
    }
  };



  if (isLoading) return <PageLoader />

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical"
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
        {steps.map((step, index) => (
          <Step completed={isStepCompleted(step)} key={step.label}  sx={{cursor: 'pointer'}}>
            <StepLabel onClick={() => jumpToStep(index)}>
              <Typography variant="h5">{step.label}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {getSubtitle(step.stepName)}
              </Typography>
            </StepLabel>
            <StepContent sx={{
              p: {
                xs: 0,
                md: 1
              }
            }}>
              <step.component
                index={index}
                steps={steps}
                handleNext={handleNext}
                invoiceForm={invoiceForm}
                handleBack={handleBack}
                saveDataConnect={saveDataConnect}
              />

            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1, color: "black" }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}