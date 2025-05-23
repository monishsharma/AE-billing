import React, { forwardRef, useEffect, useMemo, useState } from "react";
import styles from "./invoice.module.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import {
    Paper,
    Box,
    Typography,
    Modal,
    TextField,
} from "@mui/material";
import { COMPANY_TYPE } from "../../constants/app-constant";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Swal from "sweetalert2";
import PageLoader from "../page-loader";
import DatePicker from "react-datepicker";
import { toast, Bounce } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import Table from "../table";
import { useOutletContext } from "react-router-dom";
import { tableConstants } from "./tableConstant";
import Pagination from "../pagination";
import { isMobileDevice } from "../../helpers/is-mobile-device";
import { debounce } from "../../helpers/debounce";

const Invoice = ({
    invoiceForm,
    getInvoiceListConnect,
    getBillPdfConnect,
    generateCSVConnect,
    resetReducerConnect,
    updateInvoiceConnect,
    searchInvoiceConnect
}) => {
    const navigate = useNavigate();
    const {isActive} = useOutletContext();
    const { _id = "" } = invoiceForm || {};
    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [dateValue, setDateValue] = useState(new Date());
    const [btnLoading, setBtnLoading] = useState(false);
    const [runEffect, setRunEffect] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isQueryRunning, setIsQueryRunning] = useState(false);

    const onClick = () => {
        if (_id) {
            resetReducerConnect();
        }
        navigate("/new/invoice");
    };

    const showToast = ({ type, text, ...rest }) =>
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
    });

    const fetchInvoices = () => {
        setIsLoading(true);
        setSearchValue("")
        getInvoiceListConnect({
          company: value,
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          month: dateValue.getMonth() + 1,
          year: dateValue.getFullYear(),
        })
          .then((res) => {
            setInvoices(res.data);
            setTotalpage(Number(res.totalItems));
          })
          .catch(() => {
            setInvoices([]);
            setTotalpage(0);
          })
          .finally(() => {
            setIsLoading(false);
            setIsQueryRunning(false);
          });
      };

      useEffect(() => {
        if(!searchValue) {
              fetchInvoices();
        }
      }, [value, paginationModel, dateValue, runEffect]);


    const handleChange = (event, newValue) => {
        setPaginationModel({
            page: 0,
            pageSize: 10,
        });
        setSearchValue("");
        setValue(newValue);
    };

    const handleRowClick = async (e, row) => {
        e.stopPropagation(); // prevent triggering row click
        resetReducerConnect();
        navigate(`/edit/invoice/${row._id}`);
    };

    const handleDownload = async (e, row, downloadOriginal = false) => {
        e.stopPropagation(); // prevent triggering row click

        const payload = {
            downloadOriginal,
            id: row._id,
        };

        let toastId = null;

        showToast({
            type: "info",
            text: "Preparing download...",
            autoClose: false,
            closeButton: false,
            progress: 0,
            theme: "dark",
            toastId: "download-toast",
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
                                toastId: "download-toast", // consistent ID to update the same toast
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

            const contentDisposition = pdfResponse.headers["content-disposition"];
            const match = contentDisposition?.match(/filename="?(.+)"?/);
            const filename = match?.[1] || "invoice.pdf";

            const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = fileURL;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            //   setIsLoading(false);
            toast.update("download-toast", {
                render: "Download complete!",
                type: "success",
                autoClose: 2000,
                progress: undefined,
            });
        } catch (pdfErr) {
            console.error("PDF generation error", pdfErr);
            Swal.fire({
                icon: "error",
                text: "Failed to generate PDF",
            });
            setIsLoading(false);
        }
    };

    const handleOpenPaymentModal = (invoice) => {
        setSelectedInvoice(invoice);
        setOpenPaymentModal(true);
        setPaymentAmount(invoice.goodsDescription.Total);
    };

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

    const chekboxhandler = async (e, row) => {
        e.stopPropagation();
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
                setRunEffect(!runEffect);
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
    };

    const getDuePayment = (value) => {
        if (value.paymentAmount) {
            return {
                amount: value.duePayment,
                color: value.duePayment ? "red" : "green",
            };
        }

        return { amount: value.goodsDescription.Total, color: "red" };
    };

    const downloadCSV = async () => {
        setBtnLoading(true);
        generateCSVConnect({
            company: value,
            month: dateValue.getMonth() + 1,
            year: dateValue.getFullYear(),
        })
            .then(({ data, headers }) => {
                const blob = new Blob([data], { type: "text/csv" }); // Convert text to Blob
                const url = window.URL.createObjectURL(blob);
                const contentDisposition = headers.get("Content-Disposition");

                let filename = `${value} SALES .csv`; // Fallback
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match && match[1]) {
                        filename = match[1];
                    }
                }

                const a = document.createElement("a");
                a.href = url;
                a.download = `${filename}`; // Customize filename here
                document.body.appendChild(a);
                a.click();
                a.remove();
                setBtnLoading(false);

                window.URL.revokeObjectURL(url);
            })
            .catch((err) => {
                console.log(err);
                setBtnLoading(false);

                Swal.fire({
                    icon: "error",
                    text: "Failed to generate CSV",
                });
            });
    };

    const handleDateChange = (selectedDate) => {
        setDateValue(selectedDate);
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="d-flex ">
            <Button
                fullWidth
                onClick={onClick}
                variant="outlined"
                size="medium"
                ref={ref}
                className="customBtn"
            >
                {value}
            </Button>
        </div>
    ));

    const paginationCheck = () => {
        if (isMobileDevice()) {
            return isActive;
        }
        return true;
    }

    const debouncedSearch = useMemo(() =>
        debounce((searchTerm) => {
            setIsQueryRunning(true);
          if (searchTerm.length > 0) {
            searchInvoiceConnect({ company: value, searchTerm })
              .then((res) => {
                setInvoices(res.data);
                setTotalpage(Number(res.totalItems));
                setIsQueryRunning(false);
                setPaginationModel({
                    page: 0,
                    pageSize: 10,
                });

              })
              .catch(() => {
                setInvoices([]);
                setTotalpage(0);
                setSearchValue("");
                setIsQueryRunning(false);

              });
          } else {
            setSearchValue("");
            fetchInvoices();
          }
        }, 500), [value, paginationModel, dateValue]
      );

      const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        debouncedSearch(val);
      };

    const renderInvoices = () => (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", height: "100vh" }}>
                <div className="customTable">
                    <Table
                        data={invoices}
                        isClickable={true}
                        hoverable={true}
                        isQueryRunning={isQueryRunning}
                        onClick={handleRowClick}
                        cols={tableConstants({
                            chekboxhandler,
                            handleDownload,
                            getDuePayment,
                        })}
                    />
                </div>
            </Paper>
        </>
    );

    if (isLoading) return <PageLoader />;

    return (
        <React.Fragment>
            {paginationCheck() && <Pagination  paginationModel={paginationModel} totalpage={totalpage} setPaginationModel={setPaginationModel} />}
            <div className={`mt-3`}>
                <h2 className="fw-bold">Invoice</h2>
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    width: {
                        xs: "100%"
                    },
                    mt: 2,
                    alignItems: "center",
                }}
            >
                <Button
                    onClick={onClick}
                    variant="contained"
                    className="customBtn"
                    size="medium"
                    startIcon={<AddIcon />}
                    sx={{
                        textTransform: "none",
                        minWidth: "120px",
                        width: {
                            xs: "100%",
                            sm: "auto",
                        }
                    }}
                >
                    Create Invoice
                </Button>
                <Box className={`d-flex align-items-center ${styles.end}`}
                    sx={{
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
                        },
                    }}  >
                        <DatePicker
                            selected={dateValue}
                            showMonthYearPicker={true}
                            dateFormat="MMMM, YYYY"
                            onChange={handleDateChange}
                            customInput={<ExampleCustomInput />}
                        />
                    </Box>
                    <Box className={`m-1`} sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        }
                    }}  >
                        <Button
                            fullWidth
                            onClick={downloadCSV}
                            loading={btnLoading}
                            variant="outlined"
                            size="medium"
                            className="outlinedCustomBtn"
                        >
                            <span style={{ visibility: btnLoading ? "hidden" : "visible" }}>
                                Export as CSV
                            </span>
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box className="d-flex" sx={{
                mt: 2,
            }}>
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
                />
                {/* <Button
                    variant="contained"
                    className="customBtn"
                    size="medium"
                    sx={{
                        marginLeft: 2,
                        width: "325px",
                    }}

                >Filter</Button> */}
            </Box>

            <div className="mt-2">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            textColor="black"
                            sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#000", // set your custom color
                                },
                            }}
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label={COMPANY_TYPE.ASHOK} value={COMPANY_TYPE.ASHOK} />
                            <Tab label={COMPANY_TYPE.PADMA} value={COMPANY_TYPE.PADMA} />
                        </TabList>
                    </Box>
                    <TabPanel
                        value={COMPANY_TYPE.ASHOK}
                        sx={{
                            p: {
                                xs: 0,
                                sm: 2,
                                md: 0,
                            },
                        }}
                    >
                        {renderInvoices()}
                    </TabPanel>
                    <TabPanel
                        value={COMPANY_TYPE.PADMA}
                        sx={{
                            p: {
                                xs: 0,
                                sm: 2,
                                md: 0,
                            },
                        }}
                    >
                        {renderInvoices()}
                    </TabPanel>
                </TabContext>
            </div>

            <Modal
                open={openPaymentModal}
                onClose={handleClosePaymentModal}
                aria-labelledby="payment-modal-title"
                aria-describedby="payment-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        id="payment-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 2 }}
                    >
                        Enter Amount for {selectedInvoice?.invoiceDetail?.invoiceNO}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Payment Amount"
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        sx={{ mb: 3 }}
                        InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button onClick={handleClosePaymentModal} variant="outlined">
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePaymentSubmit}
                            variant="contained"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default Invoice;
