import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { toast, Bounce } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useOutletContext } from "react-router-dom";
import { debounce } from "../../helpers/debounce";
const DataGrid = React.lazy(() =>
  import('@mui/x-data-grid').then(m => ({ default: m.DataGrid }))
);
import {  getColumns } from "./selector";
import PaymentConfirmationModal from "../payment-confirmation-modal";
import CompanyTabs from "../company-tabs";
import { downloadFile } from "../../helpers/file-downloader";
import HeroSection from "../hero-section";
import ClearInputAdorment from "../../shared/components/clear-input-adorment";
import DatePicker from "../../shared/components/date-picker/custom-input";
import { REPORT_BTN } from "./constant";

const Invoice = ({
    config,
    invoiceForm,
    getInvoiceListConnect,
    getBillPdfConnect,
    generateCSVConnect,
    resetReducerConnect,
    updateInvoiceConnect,
    searchInvoiceConnect,
    generateGstReportConnect
}) => {
    const { vendorsList } = config || {};
    const navigate = useNavigate();
    const { company } = useParams();
    const {isActive, ref} = useOutletContext();
    const scroll = localStorage.getItem("scroll");
    const { _id = "" } = invoiceForm || {};
    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    // const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const [dateValue, setDateValue] = useState(new Date());
    const [btnLoading, setBtnLoading] = useState(false);
    const [runEffect, setRunEffect] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isQueryRunning, setIsQueryRunning] = useState(false);

    useEffect(() => {
        if(!isLoading&& invoices.length) {
        ref.current.scrollTop = scroll;
        }
    }, [isLoading, invoices])

    const onClick = () => {
        if (_id) {
            resetReducerConnect();
        }
        navigate("/new/invoice");
    };

    const showToast = React.useCallback(({ type, text, ...rest }) =>
        toast[type](text, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            ...rest,
    }), []);

    const fetchInvoices = () => {
        setIsLoading(true);
        setSearchValue("")
        getInvoiceListConnect({
          company,
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          month: dateValue.getMonth() + 1,
          year: dateValue.getFullYear(),
        })
          .then((res) => {
            setInvoices(res.data);
          })
          .catch(() => {
            setInvoices([]);
          })
          .finally(() => {
            setIsLoading(false);
            setIsQueryRunning(false);
          });
      };

      const fetchSearchInvoices = (searchTerm) => {
        setIsQueryRunning(true);
        searchInvoiceConnect({ company, searchTerm, page : paginationModel.page + 1})
              .then((res) => {
                setInvoices(res.data);
                setIsQueryRunning(false);

              })
              .catch(() => {
                setInvoices([]);
                setSearchValue("");
                setIsQueryRunning(false);

              });
      }

      useEffect(() => {
        if (searchValue.length > 0) {
            fetchSearchInvoices(searchValue);
        } else {
            fetchInvoices();
        }
      }, [company, paginationModel, dateValue, runEffect]);


    const handleChange = (event, newValue) => {
        setPaginationModel({
            page: 0,
            pageSize: 10,
        });
        setSearchValue("");
        navigate(`/invoice/${newValue}`);
    };

    const handleRowClick = async ({row}) => {
        resetReducerConnect();
        navigate(`/edit/invoice/${row._id}`);
    };

    const handleDownloadClick = async (e, row) => {
        e.stopPropagation();

        const result = await Swal.fire({
            title: "Download Invoice",
            text: "Which invoice would you like to download?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,

            confirmButtonText: "Original",
            denyButtonText: "Duplicate",

            confirmButtonColor: "#00e676",
            denyButtonColor: "#2196f3",
        });

        if (result.isConfirmed) {
            handleDownload(e, row, true); // Original
        }

        if (result.isDenied) {
            handleDownload(e, row, false); // Duplicate
        }
    };

    const handleDownload = React.useCallback(async (e, row, downloadOriginal = false) => {
        e.stopPropagation(); // prevent triggering row click

        const payload = {
            downloadOriginal,
            id: row._id,
        };

        let toastId = new Date().getTime();

        showToast({
            type: "info",
            text: downloadOriginal ? "Preparing original invoice..." : "Preparing duplicate invoice...",
            autoClose: false,
            closeButton: false,
            progress: 0,
            theme: "dark",
            toastId: toastId,
        });

        try {
            //   setIsLoading(true);
            const pdfResponse = await getBillPdfConnect(payload, {
                responseType: "blob",
                headers: {
                    Accept: "application/pdf",
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        // Show or update the toast
                        if (!toastId) {
                            toastId = toast.info(`Downloading... ${percent}%`, {
                                progress: percent / 100,
                                autoClose: false,
                                closeButton: false,
                                theme: "dark",
                                transition: Bounce,
                                toastId: toastId, // consistent ID to update the same toast
                            });
                        } else {
                            toast.update("download-toast", {
                                render: `Downloading... ${percent}%`,
                                progress: percent / 100,
                                theme: "dark",
                                transition: Bounce,
                            });
                        }
                    }
                },
            });

            downloadFile(pdfResponse);

            //   setIsLoading(false);
            toast.update(toastId, {
                render: "Download complete!",
                type: "success",
                autoClose: 5000,
                progress: undefined,
            });
        } catch (pdfErr) {
            console.error("PDF generation error", pdfErr);
            // remove toast on error
            toast.dismiss(toastId);
            Swal.fire({
                icon: "error",
                text: "Failed to generate PDF",
            });
            setIsLoading(false);
        }
    }, [getBillPdfConnect, showToast, setIsLoading]);

    const handleOpenPaymentModal = React.useCallback((invoice) => {
        setSelectedInvoice(invoice);
        setOpenPaymentModal(true);
        setPaymentAmount(invoice.goodsDescription.Total);
    }, []);

    const handleClosePaymentModal = () => {
        setOpenPaymentModal(false);
        setSelectedInvoice(null);
        setPaymentAmount("");
    };

    const handlePaymentSubmit = async () => {
        if (
            !paymentAmount ||
            isNaN(paymentAmount) ||
            parseFloat(paymentAmount) <= 0
        ) {
            showToast({
                type: "error",
                text: "Please enter a valid payment amount",
            });
            return;
        }

        setIsLoading(true);
        const payload = {
            ...selectedInvoice,
            paid: true,
            paymentAmount: parseFloat(paymentAmount),
            duePayment:
                parseFloat(selectedInvoice.goodsDescription.Total) -
                parseFloat(paymentAmount),
        };

        try {
            await updateInvoiceConnect(selectedInvoice._id, payload);
            setRunEffect(!runEffect);
            showToast({
                type: "success",
                text: `${selectedInvoice.invoiceDetail.invoiceNO} Marked Paid Successfully`,
            });
            handleClosePaymentModal();
        } catch (error) {
            showToast({
                type: "error",
                text: `Error while marking ${selectedInvoice.invoiceDetail.invoiceNO} Paid`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const chekboxhandler = React.useCallback(async (e, row) => {
        e.stopPropagation();
        if (row.bulkUpload) {
            Swal.fire({
                icon: "error",
                title: "Action Not Allowed",
                text: `Cannot change status of invoice ${row.invoiceDetail.invoiceNO} because it was bulk uploaded.`,
            });
            return;
        }
        if (e.target.checked) {
            handleOpenPaymentModal(row);
        } else {
            setIsLoading(true);
            const payload = {
                ...row,
                paid: false,
                paymentAmount: 0,
            };
            try {
                await updateInvoiceConnect(row._id, payload);
                setRunEffect((prev) => !prev);
                showToast({
                    type: "error",
                    text: `${row.invoiceDetail.invoiceNO} Marked Unpaid Successfully`,
                });
            } catch {
                showToast({
                    type: "error",
                    text: `Error while marking ${row.invoiceDetail.invoiceNO} Unpaid`,
                });
                setIsLoading(false);
            }
        }
    }, [updateInvoiceConnect, showToast, handleOpenPaymentModal]);

    const getDuePayment = (value) => {
        if (value.paymentAmount) {
            return {
                amount: value.duePayment,
                color: value.duePayment ? "red" : "green",
            };
        }

        return { amount: value.goodsDescription.Total, color: "red" };
    };

    const downloadCSV = async (forGST = false) => {
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();
        setBtnLoading(true);
        generateCSVConnect({
            company,
            forGST,
            month,
            year,
        })
            .then((response) => {
               downloadFile(response,`${company}-SALES-${month}-${year}.xlsx`);
                setBtnLoading(false);

            })
            .catch((err) => {
                setBtnLoading(false);

                Swal.fire({
                    icon: "error",
                    text: "Failed to generate CSV",
                });
            });
    };

    const onClickGstReportBtn = () => {
        setBtnLoading(true);
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();
        generateGstReportConnect({
            company,
            month,
            year,
        })
        .then((response) => {
            downloadFile(response,`${company}-GST-${month}-${year}.xlsx`);
            setBtnLoading(false);

        })
        .catch(() => {
            setBtnLoading(false);

                Swal.fire({
                    icon: "error",
                    text: "Failed to generate Report",
                });
        })
    };

    const handleDateChange = (selectedDate) => {
        setDateValue(selectedDate);
        setPaginationModel({
            page: 0,
            pageSize: 10
        })
    };


    const debouncedSearch = useMemo(() =>
        debounce((searchTerm) => {
            setIsQueryRunning(true);
          if (searchTerm.length > 0) {
            fetchSearchInvoices(searchTerm);
          } else {
            setSearchValue("");
            fetchInvoices();
          }
        }, 800), [company, paginationModel, dateValue]
      );

      const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        if (val.length === 0) {
            setPaginationModel({
                page: 0,
                pageSize: 10,
            });
        } else {
            debouncedSearch(val);
        }
      };


      const columns = useMemo(() => getColumns({
        handleDownloadClick,
        chekboxhandler,
        value: company,
        vendorsList
    }), [handleDownload, chekboxhandler, company, vendorsList]);

    const renderInvoices = () => (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", height: "61vh" }}>

                <DataGrid
                    rows={isLoading || isQueryRunning ? [] : invoices}
                    getRowId={(row) => row._id}
                    columns={columns}
                    disableColumnMenu={true}
                    onRowClick={handleRowClick}
                    loading={isLoading || isQueryRunning}
                    disableRowSelectionOnClick
                    disableColumnResize

                     sx={{
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                        },
                        cursor: 'pointer',

                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                        },

                        // /* Status cell container */
                        // "& .status-cell": {
                        //     position: "relative",
                        //     width: "100%",
                        // },

                        // /* Chip visible by default */
                        // "& .status-chip": {
                        //     zIndex: 1,
                        //     transition: "opacity 0.15s ease",
                        // },

                        // /* Hover actions (hidden by default) */
                        // "& .gmail-actions": {
                        //     position: "absolute",
                        //     top: "50%",
                        //     transform: "translateY(-50%)",
                        //     opacity: 0,
                        //     pointerEvents: "none",
                        //     transition: "opacity 0.15s ease",
                        //     zIndex: 2,
                        // },

                        // /* Show actions on row hover */
                        // "& .MuiDataGrid-row:hover .gmail-actions": {
                        //     opacity: 1,
                        //     pointerEvents: "auto",
                        // },

                        // /* Hide chip on hover (Gmail swap effect) */
                        // "& .MuiDataGrid-row:hover .status-chip": {
                        //     opacity: 0,
                        // },

                     }}
                    initialState={
                        {
                            pagination: {
                                paginationModel,
                            },
                        }
                    }
                    // showToolbar
                />
            </Paper>
        </>
    );

    // if (isLoading) return <PageLoader />;

    return (
        <React.Fragment>
            <HeroSection
                pageTitle="Invoice"
                btnText="Create Invoice"
                startIcon={<AddIcon />}
                style={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    width: {
                        xs: "100%",
                        sm: "100%"
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2
                }}
                onClick={onClick}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column-reverse",
                            sm: "row",
                        },
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                        pt: {
                            xs: 1,
                            sm: 0
                        }
                    }}
                >
                    <Box className={`m-1`} sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        }
                    }}  >
                        <TextField
                            label="Search Invoice"
                            variant="outlined"
                            size="small"
                            onChange={(e) => handleInputChange(e)}
                            value={searchValue}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px', // 👈 Rounded corners
                                },
                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },

                            }}
                            endAdornment
                            slotProps={{
                                input:{
                                    endAdornment: (
                                        !!(searchValue .length) &&
                                        <ClearInputAdorment
                                            onClick={() => {
                                                setSearchValue("");
                                                setIsQueryRunning(false);
                                                fetchInvoices();
                                            }}
                                        />
                                    )
                                }
                            }}
                        />
                    </Box>
                    <Box className={`m-1`} sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                    }}  >
                        <DatePicker
                            selected={dateValue}
                            showMonthYearPicker={true}
                            dateFormat="MMMM, YYYY"
                            onChange={handleDateChange}
                            withPortal={true}
                            customInput={true}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            width: {
                                xs: "100%",
                                sm: "auto",
                            }
                        }}
                    >
                        {
                            REPORT_BTN.map((btn) => {
                                const onClickHandler = btn.downloadGstFile ? () => onClickGstReportBtn() : () => downloadCSV(false)
                                return (
                                    <Box
                                        className={`m-1`}
                                        sx={{
                                            width: {
                                                xs: "100%",
                                                sm: "auto",
                                            }
                                        }}
                                    >
                                        <Button
                                            fullWidth
                                            size="medium"
                                            loading={btnLoading}
                                            className="outlinedCustomBtn"
                                            onClick={onClickHandler}

                                        >
                                            <span style={{ visibility: btnLoading ? "hidden" : "visible" }}>
                                                {`${company} ${btn.buttonText}`}
                                            </span>
                                        </Button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </HeroSection>

            <div className="mt-2">
                <CompanyTabs
                    value={company}
                    onChange={handleChange}
                    renderContent={renderInvoices}
                />
            </div>

            <PaymentConfirmationModal
                openPaymentModal={openPaymentModal}
                selectedInvoice={selectedInvoice}
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
                isLoading={isLoading}
                handlePaymentSubmit={handlePaymentSubmit}
                handleClosePaymentModal={handleClosePaymentModal}
            />
        </React.Fragment>
    );
};

export default Invoice;
