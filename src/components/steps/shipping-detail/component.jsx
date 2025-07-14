import React, { useState } from "react";
import {INPUTS} from "./selector";
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';
import StepperButton from '../stepper-button';
import { COMPANY, STEPPER_NAME } from "../../../constants/app-constant";
import {VENDOR_NAME} from "../../../constants/app-constant";
import PageLoader from "../../../components/page-loader";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const ShippingDetails = ({
    index,
    steps,
    handleNext,
    handleBack,
    invoiceForm,
    saveDataConnect,
    getBillPdfConnect,
    resetReducerConnect,
    postInvoiceConnect,
    updateInvoiceConnect
}) => {

    const ASN_INPUT = {
        id: "asn",
        name: "ASN",
        placeholder: "ASN",
        type: "textField",
        key: "asn",
        component: TextField
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dynamicInputs, setDynamicInputs] = useState(INPUTS || []);

    const {
        [STEPPER_NAME.SHIPMENT_DETAIL]: {
            vehicleNo,
            eway,
            asn = ""
        },
        [STEPPER_NAME.BUYER_DETAIL]: {
            customer
        },
        [STEPPER_NAME.GOODS_DESCRIPTION]: {
            Total
        }
    } = invoiceForm;

    const isUnqiueVendor = customer === VENDOR_NAME.RAJASTHAN_EXPLOSIVES_AND_CHEMICALS_LTD;


    const invoiceFormDetail = {
        vehicleNo: vehicleNo || "",
        eway: eway || "",
        ...(customer === VENDOR_NAME.CROMPTON && {
            asn: asn ||  ""
        })
    };

    const [invoiceFormValidation, setInvoiceFormValidation] = useState({
        vehicleNo: true,
        eway: true,
    });

    React.useEffect(() => {
        if (customer === VENDOR_NAME.CROMPTON) {
            if (!dynamicInputs.find((item) => item.key === "asn"))
            setDynamicInputs([
                ...dynamicInputs,
                ASN_INPUT
            ]);
            setInvoiceFormValidation({
                ...invoiceFormValidation,
                asn: true
            })

        }
    }, [customer, dynamicInputs])


    const performValidation = () => {
        const updatedValidation = Object.keys(invoiceFormDetail).reduce((acc, key) => {
            if (isUnqiueVendor) {
                acc[key]= true
                return acc;
            }
            if (key === "eway") {
                acc[key] = true; // skip validation
            }

            else if (key === "asn") {
                acc[key] = true; // skip validation
            } else {
                acc[key] = !!invoiceFormDetail[key]; // regular validation
            }
            return acc;
        }, {});

        setInvoiceFormValidation(updatedValidation);
        return Object.values(updatedValidation).every(Boolean);
    };

    const handleNextHandler = () => {
        if (performValidation()) {
          setIsLoading(true);

          const { config, ...rest } = invoiceForm;
          if (!rest.invoiceDetail.htmlContent) {
            const {vendorList, ...otherData} = COMPANY[rest.invoiceDetail.value] || {};
            rest.invoiceDetail = {
                ...rest.invoiceDetail,
                ...otherData
            }
          }
          delete rest.currentStep;

          const payload = {
            ...rest,
            ...(!id && {
                paid: false
            })
          };
          const action = id ? () => updateInvoiceConnect(id, payload) : () => postInvoiceConnect(payload);

          action()
            .then(async () => {
            //     const payload = {
            //         downloadOriginal: false,
            //         id: res.id
            //     }

            //   try {
            //     // Get PDF blob using GET
            //     const pdfResponse = await getBillPdfConnect(payload, {
            //       responseType: "blob",
            //       headers: {
            //         Accept: "application/pdf",
            //       },
            //     });

            //     const contentType = pdfResponse.headers["content-type"];
            //     const blob = new Blob([pdfResponse.data], { type: contentType });

            //     const fileURL = URL.createObjectURL(blob);
            //     window.open(fileURL, "_blank");
            //   } catch (pdfErr) {
            //     console.error("PDF generation error", pdfErr);
            //     Swal.fire({
            //       icon: "error",
            //       text: "Failed to generate PDF",
            //     });
            //   }
            Swal.fire({
                icon: "success",
                title: `Invoice ${id ? "Updated" : "Created"} Successfully`
            }).then(() => {
                navigate('/invoice', { replace: true });

            })
              handleNext();
              resetReducerConnect();
              setIsLoading(false);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                text: error?.err || "Something went wrong",
              });
              setIsLoading(false);
            });
        }
      };



    const onFieldChange = (event) => {
        const { value, name } = event.target;

        saveDataConnect({
            stepName: STEPPER_NAME.SHIPMENT_DETAIL,
            data: {
                [name]: value.toUpperCase()
            }
        })

        setInvoiceFormValidation({
            ...invoiceFormValidation,
            [name]: !!value
        });
    };

    if (isLoading) return <PageLoader />

    return (
        <>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
        >
            <Grid container spacing={2}>
                {dynamicInputs.map((input, index) => {
                    const Component = input.component;
                    return (
                        <Grid key={index} item size={{xs:12, md: 4}}>
                            {
                                <Component
                                    {...input.extraProps}
                                    name={input.id}
                                    label={input.placeholder}
                                    variant='outlined'
                                    onChange={onFieldChange}
                                    value={invoiceFormDetail[input.key]}
                                    error={!invoiceFormValidation[input.key]}
                                    helperText={invoiceFormValidation[input.key] ? "" : `${input.placeholder} is required`}
                                    fullWidth
                                    autoComplete={input.name}
                                />
                            }
                        </Grid>
                    );
                })}
            </Grid>
            <StepperButton
                index={index}
                steps={steps}
                handleNext={handleNextHandler}
                handleBack={handleBack}
            />
        </Box>
        </>
    )
};

export default ShippingDetails;