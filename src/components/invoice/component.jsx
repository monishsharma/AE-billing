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
    InputAdornment,
    inputBaseClasses,
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
import { DataGrid } from "@mui/x-data-grid";
import {  getColumns } from "./selector";
import PaymentConfirmationModal from "../payment-confirmation-modal";
import ClearIcon from '@mui/icons-material/Clear';

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
    const {isActive, ref} = useOutletContext();
    const scroll = localStorage.getItem("scroll");
    const { _id = "" } = invoiceForm || {};
    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
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

      const fetchSearchInvoices = (searchTerm) => {
        setIsQueryRunning(true);
        searchInvoiceConnect({ company: value, searchTerm, page : paginationModel.page + 1})
              .then((res) => {
                setInvoices(res.data);
                setTotalpage(Number(res.totalItems));
                setIsQueryRunning(false);
                // setPaginationModel((prev) => {
                // const newModel = { ...paginationModel };
                // return JSON.stringify(prev) === JSON.stringify(newModel) ? prev : newModel;
            // });

              })
              .catch(() => {
                setInvoices([]);
                setTotalpage(0);
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
      }, [value, paginationModel, dateValue, runEffect]);


    const handleChange = (event, newValue) => {
        setPaginationModel({
            page: 0,
            pageSize: 10,
        });
        setSearchValue("");
        setValue(newValue);
    };

    const handleRowClick = async ({row}) => {
        // e.stopPropagation(); // prevent triggering row click
        resetReducerConnect();
        navigate(`/edit/invoice/${row._id}`);
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
            text: "Preparing download...",
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
            toast.update(toastId, {
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
        setBtnLoading(true);
        generateCSVConnect({
            company: value,
            forGST,
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
        setPaginationModel({
            page: 0,
            pageSize: 10
        })
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
            fetchSearchInvoices(searchTerm);
          } else {
            setSearchValue("");
            fetchInvoices();
          }
        }, 800), [value, paginationModel, dateValue]
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


      const columns = useMemo(() => getColumns({ handleDownload, chekboxhandler, value }), [handleDownload, chekboxhandler, value]);

    const renderInvoices = () => (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", height: "54vh" }}>
                {/* <div className="customTable">
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
                </div> */}
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
            {/* {paginationCheck() && parseInt(totalpage) > 10 && <Pagination  paginationModel={paginationModel} totalpage={totalpage} setPaginationModel={setPaginationModel} />} */}
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
                        xs: "100%",
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
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
                        },
                    }}  >
                        <DatePicker
                            selected={dateValue}
                            showMonthYearPicker={true}
                            dateFormat="MMMM, YYYY"
                            onChange={handleDateChange}
                            withPortal
                            customInput={<ExampleCustomInput />}
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
                            <Box className={`m-1`} sx={{
                            width: {
                                xs: "100%",
                                sm: "auto",
                            }
                        }}  >
                            <Button
                                fullWidth
                                onClick={() => downloadCSV(false)}
                                loading={btnLoading}
                                variant="outlined"
                                size="medium"
                                className="outlinedCustomBtn"
                            >
                                <span style={{ visibility: btnLoading ? "hidden" : "visible" }}>
                                    {value} Sales
                                </span>
                            </Button>
                        </Box>
                        <Box className={`m-1`} sx={{
                            width: {
                                xs: "100%",
                                sm: "auto",
                            }
                        }}  >
                            <Button
                                fullWidth
                                onClick={() => downloadCSV(true)}
                                loading={btnLoading}
                                variant="outlined"
                                size="medium"
                                className="outlinedCustomBtn"
                            >
                                <span style={{ visibility: btnLoading ? "hidden" : "visible" }}>
                                    {value} GST
                                </span>
                            </Button>
                        </Box>
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
                    slotProps={{
                        input:{
                            endAdornment: (
                                !!(searchValue .length) &&
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        cursor: 'pointer' ,
                                    }}
                                    onClick={() => {
                                        setSearchValue("");
                                        setIsQueryRunning(false);
                                        fetchInvoices();
                                    }}
                                >

                                    <ClearIcon  />
                                </InputAdornment>
                            )
                        }
                    }}
                />
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
