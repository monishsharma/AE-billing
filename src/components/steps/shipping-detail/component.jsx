import React, { useState } from "react";
import {getPayloadForASN, INPUTS} from "./selector";
import Box from '@mui/material/Box';
import { Grid, TextField, Typography } from '@mui/material';
import StepperButton from '../stepper-button';
import { CG_URL, COMPANY, STEPPER_NAME } from "../../../constants/app-constant";
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
    checkASNExistConnect,
    generateASNConnect,
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
        component: TextField,
        description: true
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
            po,
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

    const downloadASN = (asnNumber) => {
        window.open(`${CG_URL}${asnNumber}`, '_blank')
        Swal.close();
    }

    const fireSWal = (asnNumber) => (
        Swal.fire({
            icon: "success",
            title: "ASN Already Generated",
            html: `
                <p>ASN NO - ${asnNumber}</p>
                <div style="display:flex; gap:10px; justify-content:center; margin-top:15px;">
                    <button id="okBtn" class="swal2-confirm swal2-styled">OK</button>
                    <button id="downloadBtn" class="swal2-confirm swal2-styled">Download ASN</button>
                </div>
            `,
            showConfirmButton: false,   // we are using our own OK button
            didOpen: () => {
                document.getElementById("okBtn").onclick = () => Swal.close();
                document.getElementById("downloadBtn").onclick = () => downloadASN(asnNumber);
            }
        })
    )

    const generateASNHandler = () => {

        if (parseFloat(Total) > 50000 && (!eway || eway.trim() === "")) {
            Swal.fire({
                icon: "error",
                title: "Eway Bill Missing",
                text: `Eway bill is mandatory for invoice value above 50,000. Current value: ${Total}`,
            })
            return;
        }

        if (asn) {
            Swal.fire({
                icon: "error",
                title: "ASN Already Generated",
                text: `ASN Already Generated, ASN NO - ${asn}`,
            })
            return;
        }

        setIsLoading(true);

        checkASNExistConnect({invoiceId: id, poNumber: po})
        .then((response) => {
            const asnNumber = response?.asnNumber || "0";
            if (response?.status === "Draft" || asnNumber === "0") {
                const payload = getPayloadForASN({
                    invoiceDetail: invoiceForm,
                    asnNumber
                });

                generateASNConnect({invoiceId: id, poNumber: po, payload})
                .then((res) => {
                    const asnNumber = res?.generatedASN?.[0]?.ASN;
                    const isAsnGenerated = res?.generatedASN?.[0]?.ASNID;
                    if (!isAsnGenerated) {
                        setIsLoading(false);
                        Swal.fire({
                            icon: "error",
                            title: "ASN Generation Failed",
                            text: `Failed to generate ASN`,
                        })
                        return;
                    }
                    saveDataConnect({
                        stepName: STEPPER_NAME.SHIPMENT_DETAIL,
                        data: {
                            "asn": asnNumber
                        }
                    });
                    setIsLoading(false);
                    fireSWal(asnNumber);
                })
                .catch((err) => {
                    setIsLoading(false);
                     Swal.fire({
                        icon: "error",
                        title: "ASN Generation Failed",
                        text: err.error,
                    })
                })

            } else {
                setIsLoading(false);
                fireSWal(asnNumber);
            }

        })
        .catch((error) => {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "ASN Check Failed",
                text: error.error,
            })
        })

    }

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
                            {
                                // input.description &&
                                input.description && !asn &&
                                <Typography
                                    variant="subtitle1"
                                    color="primary"
                                    sx={{
                                        fontSize: "14px",
                                        marginLeft: "5px",
                                    }}
                                    onClick={generateASNHandler}
                                >
                                    Generate ASN
                                </Typography>
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