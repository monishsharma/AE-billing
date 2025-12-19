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
    config,
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
  const {vendorsList = []} = config;

  const [activeStep, setActiveStep] = React.useState(currentStep);
  const [isLoading, setIsLoading] = React.useState(false)
  const stepRefs = React.useRef([]);


  React.useEffect(() => {
    // Delay scroll to allow expand animation to finish
    const timeout = setTimeout(() => {
      const el = stepRefs.current[activeStep];
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500); // adjust 300–500ms for smoother sync with MUI animation

    return () => clearTimeout(timeout);
  }, [activeStep]);

  React.useEffect(() => {
    async function fetchConfigData() {
    await getConfigConnect();
    await getHsnCodeListConnect();
  }
    fetchConfigData();

  }, [getConfigConnect, getHsnCodeListConnect])

  React.useEffect(() => {
    if (id && vendorsList.length) {
    setIsLoading(true);

      getInvoiceListConnect({id})
      .then((res) => {
        const resCopy = JSON.parse(JSON.stringify(res));
        const  {buyerDetail = {}} = resCopy;
        if (buyerDetail) {
          const index = vendorsList.findIndex(option => option.label === buyerDetail.customer);
          const selectedCustomer = vendorsList[index];
          if (selectedCustomer && !selectedCustomer.customerName) {
              resCopy.buyerDetail.customerName = selectedCustomer.label;
              resCopy.buyerDetail.customer = selectedCustomer.id;
          }
        }
          saveApiDataConnect({
              data: {
                  currentStep: 0,
                  ...resCopy
              }
          });
        setIsLoading(false);

      })
      .catch(() => {
        setIsLoading(false);
      })
    }

  }, [id, vendorsList.length])

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
      return `${buyerDetail.customerName || buyerDetail.customer}`;
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

    const canJump = steps.slice(0, stepIndex).every((s, i) => isStepCompleted(s, i));

    if (canJump && id) {
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
          //
            <Step ref={(el) => (stepRefs.current[index] = el)} completed={isStepCompleted(step)} key={step.label}  sx={{cursor: 'pointer'}}>
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
              }}

              >
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