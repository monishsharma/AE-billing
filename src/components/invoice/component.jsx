import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./invoice.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Paper, IconButton, Box, Chip, Typography, Checkbox, Modal, TextField } from "@mui/material";
import { COMPANY_TYPE } from "../../constants/app-constant";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Swal from "sweetalert2";
import PageLoader from "../page-loader";
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { toast, Bounce } from 'react-toastify';

const Invoice = ({
    invoiceForm,
    getInvoiceListConnect,
    getBillPdfConnect,
    generateCSVConnect,
    resetReducerConnect,
    updateInvoiceConnect
}) => {
    const navigate = useNavigate();
    const { _id = "" } = invoiceForm || {}
    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dateValue, setDateValue] = useState(new Date());
    const [btnLoading, setBtnLoading] = useState(false);
    const [runEffect, setRunEffect] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');

    const onClick = () => {
        if (_id){
            resetReducerConnect()
        }
        navigate("/new/invoice")
    }

    useEffect(() => {
      setIsLoading(true);
      getInvoiceListConnect({ company: value, page: paginationModel.page + 1, limit: paginationModel.pageSize, month: dateValue.getMonth() +1 , year: dateValue.getFullYear() }) // page +1 because frontend is 0-based
        .then((res) => {
          setInvoices(res.data);
          setTotalpage(Number(res.totalItems)); // must be total documents, not pages
          setIsLoading(false);
        })
        .catch(() => {
          setInvoices([]);
          setIsLoading(false);
        });
    }, [value, paginationModel, dateValue, runEffect]);

    const handleChange = (event, newValue) => {
        setPaginationModel({
            page: 0, pageSize: 10
        })
        setValue(newValue);
      };

      const handleRowClick = async(row,e) => {
        e.stopPropagation(); // prevent triggering row click
        resetReducerConnect()
        navigate(`/edit/invoice/${row.id}`)

      };

      const handleDownload = async (e, row, downloadOriginal = false) => {
        e.stopPropagation(); // prevent triggering row click

        const payload = {
          downloadOriginal,
          id: row._id
        };

        let toastId = null;


        toast.info("Preparing download...", {
            autoClose: false,
            closeButton: false,
            progress: 0,
            theme: "dark",
            transition: Bounce,
            toastId: "download-toast"
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
                  const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

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
        setPaymentAmount('');
    };

    const handlePaymentSubmit = async () => {
        if (!paymentAmount || isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
            toast.error('Please enter a valid payment amount', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return;
        }

        setIsLoading(true);
        const payload = {
            ...selectedInvoice,
            paid: true,
            paymentAmount: parseFloat(paymentAmount),
            duePayment: parseFloat(selectedInvoice.goodsDescription.Total) - parseFloat(paymentAmount)
        };

        try {
            await updateInvoiceConnect(selectedInvoice._id, payload);
            setRunEffect(!runEffect);
            toast.success(`${selectedInvoice.invoiceDetail.invoiceNO} Marked Paid Successfully`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            handleClosePaymentModal();
        } catch (error) {
            toast.error(`Error while marking ${selectedInvoice.invoiceDetail.invoiceNO} Paid`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const chekboxhandler = async (e, value) => {
        e.stopPropagation();
        if (e.target.checked) {
            handleOpenPaymentModal(value.row);
        } else {
            setIsLoading(true);
            const payload = {
                ...value.row,
                paid: false,
                paymentAmount: 0
            };
            try {
                await updateInvoiceConnect(value.row._id, payload);
                setRunEffect(!runEffect);
                toast.error(`${value.row.invoiceDetail.invoiceNO} Marked Unpaid Successfully`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } catch {
                toast.error(`Error while marking ${value.row.invoiceDetail.invoiceNO} Unpaid`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setIsLoading(false);
            }
        }
    };

    const getDuePayment = (value) => {
        if (value.row.paymentAmount){
            return {amount: value.row.duePayment, color: value.row.duePayment ? "red" : "green"};
        }

        return {amount: value.row.goodsDescription.Total, color: "red"};
    }

    const columns1 = [
        {
          field: "",
          sortable: false,
          width: 40,
          renderCell: (value) => <Checkbox id="" checked={value.row.paid}  onClick={(e) => chekboxhandler(e,value)} />,
        },
        {
            field: 'Bill',
            headerName: 'Bill',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 100,
            renderCell: (value) => (
                <>
                    <IconButton onClick={(e) => handleDownload(e, value.row)} size="small">
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton onClick={(e) => handleDownload(e, value.row, true)} size="small">
                        <DownloadIcon />
                    </IconButton>
                </>
            )
        },
        {
            field: 'Invoice No',
            headerName: 'Invoice No',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            minWidth: 150,
            // valueGetter: (value, row) => `${row.invoiceDetail.invoiceNO}`,
            renderCell: (value) => (
                <Typography
                    variant="body2"
                    color={moment(value.row.invoiceDetail.invoiceDate).isSame(moment(), 'day') ? "secondary" : "black"}
                    sx={{
                        height: "100%",
                        display:"flex",
                        alignItems: "center"
                    }}
                >
                    {value.row.invoiceDetail.invoiceNO}
                </Typography>
            )
        },
        {
            field: 'Description',
            headerName: 'Description',
            description: 'This column has a value getter and is not sortable.',
            minWidth: 250,
            sortable: false,
            valueGetter: (value, row) => `${row.goodsDescription.items[0].description || "-"}`,
        },
        {
            field: 'Billed To',
            headerName: 'Billed To',
            description: 'This column has a value getter and is not sortable.',
            minWidth: 200,
            sortable: false,
            valueGetter: (value, row) => `${row.buyerDetail.customer}`,
        },

        {
            field: 'date',
            headerName: 'Date',
            description: 'This column has a value getter and is not sortable.',
            minWidth: 125,
            sortable: false,
            valueGetter: (value, row) => `${moment(row.invoiceDetail.invoiceDate).format("LL")}`,
        },
        {
            field: 'status',
            headerName: 'Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 100,
            renderCell: (value) => <Chip label={value.row.paid ? "Paid" : "Unpaid"} size="small" variant="outlined" color={value.row.paid ? "success" : "error"} />,
        },
        {
            field: 'Amount',
            headerName: 'Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 120,
            valueGetter: (value, row) => `${parseFloat(row.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
            field: 'Amount Paid',
            headerName: 'Paid Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 120,
            renderCell: (value) => <Typography
                    variant="body2"
                    color={value.row.paymentAmount ? "green" : "red"}
                    sx={{
                        height: "100%",
                        display:"flex",
                        alignItems: "center"
                    }}
                >

                    {parseFloat(value.row.paymentAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>,
        },
        {
            field: 'Amount Due',
            headerName: 'Amount Due',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            minWidth: 120,
            renderCell: (value) => <Typography
                    variant="body2"
                    color={getDuePayment(value).color}
                    sx={{
                        height: "100%",
                        display:"flex",
                        alignItems: "center"
                    }}
                >

                    {parseFloat(getDuePayment(value).amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>,

        },

    ];


      const downloadCSV = async () => {
        setBtnLoading(true);
        generateCSVConnect({ company: value, month: dateValue.getMonth() + 1, year: dateValue.getFullYear() })
          .then(({data, headers}) => {
            const blob = new Blob([data], { type: 'text/csv' }); // Convert text to Blob
            const url = window.URL.createObjectURL(blob);
            const contentDisposition = headers.get('Content-Disposition');

            let filename = `${value} SALES .csv`; // Fallback
            if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = match[1];
            }
            }

            const a = document.createElement('a');
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
        setDateValue(selectedDate)
    }

      const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="d-flex ">
          <Button onClick={onClick} variant="contained" size="small" ref={ref}>
           {value}
         </Button>
        </div>
       ));


    const CustomToolbar = () => (
        <GridToolbarContainer>
            <div className="d-flex align-items-center customToolbarBtn" style={{width: "100%"}}>
                <div className="d-flex">
                    <div className={`m-1 ${styles.end}`}>
                        <DatePicker
                            selected={dateValue}
                            showMonthYearPicker={true}
                            dateFormat="MMMM, YYYY"
                            onChange={handleDateChange}
                            customInput={<ExampleCustomInput />}
                        />
                    </div>
                    <div className={`m-1 ${styles.end}`} >
                        <Button fullWidth onClick={downloadCSV} loading={btnLoading} variant="contained" size="small">
                            Export as CSV
                        </Button>
                    </div>
                </div>
            </div>
        </GridToolbarContainer>
    );


    const renderInvoices = () => (
        <>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: {
                      xs: 'column',   // stack on mobile
                      sm: 'row',      // row on tablets and up
                    },
                    alignItems: 'center',
                    p: {
                      xs: 1,  // 8px
                      sm: 2,  // 16px
                      md: 1,  // 24px
                    },
                    gap: {
                      xs: 1,
                      sm: 2,
                    },
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '4px 4px 0 0'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        '& .MuiTypography-root': {
                            color: 'text.secondary',
                            fontWeight: 500,
                            fontSize: '0.875rem'
                        }
                    }}>
                        <Typography variant="body2">
                            Showing {paginationModel.page * paginationModel.pageSize + 1} to {Math.min((paginationModel.page + 1) * paginationModel.pageSize, totalpage)} of {totalpage} entries
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '& .MuiButton-root': {
                            textTransform: 'none',
                            minWidth: '32px',
                            height: '32px',
                            padding: '4px',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            },
                            '&.Mui-disabled': {
                                color: 'rgba(0, 0, 0, 0.26)',
                                borderColor: 'rgba(0, 0, 0, 0.12)'
                            }
                        }
                    }}>
                        <Button
                            variant="outlined"
                            size="small"
                            disabled={paginationModel.page === 0}
                            onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page - 1 }))}
                            startIcon={<NavigateBeforeIcon />}
                        >
                            Previous
                        </Button>
                        <Typography variant="body2" sx={{ mx: 1, color: 'text.secondary' }}>
                            Page {paginationModel.page + 1} of {Math.ceil(totalpage / paginationModel.pageSize)}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            disabled={(paginationModel.page + 1) * paginationModel.pageSize >= totalpage}
                            onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page + 1 }))}
                            endIcon={<NavigateNextIcon />}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
                <DataGrid
                    rows={invoices}
                    columns={columns1}
                    rowSelection={false}
                    onRowClick={(e, row) => handleRowClick(e, row)}
                    getRowId={(row) => row._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    paginationMode="server"
                    rowCount={totalpage}
                    hideFooterPagination
                    showToolbar
                    slots={{ toolbar: CustomToolbar }}
                    editMode="row"
                    processRowUpdate={(newRow) => {
                        // Handle row update here if needed
                        return newRow;
                    }}
                    sx={{
                        width: '100%',
                        '.MuiDataGrid-cell:focus': {
                            outline: 'none'
                        },
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            minHeight: '200px'
                        },

                    }}
                />
            </Paper>
        </>
    );

    if (isLoading) return <PageLoader />

    return (
        <React.Fragment>
            <div className={`mt-3`}>
                <h2 className="fw-bold">Invoice</h2>
            </div>

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mt: 2
            }}>
                <Button
                    onClick={onClick}
                    variant="contained"
                    size="medium"
                    sx={{
                        textTransform: 'none',
                        minWidth: '120px'
                    }}
                >
                    Create Invoice
                </Button>
            </Box>

            <div className="mt-2">
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab label={COMPANY_TYPE.ASHOK} value={COMPANY_TYPE.ASHOK} />
                            <Tab label={COMPANY_TYPE.PADMA} value={COMPANY_TYPE.PADMA} />
                        </TabList>
                    </Box>
                    <TabPanel value={COMPANY_TYPE.ASHOK} sx={{
                      p:{
                        xs: 0,
                        sm: 2,
                        md: 0
                      }
                    }}>
                        {renderInvoices()}
                    </TabPanel>
                    <TabPanel value={COMPANY_TYPE.PADMA} sx={{
                      p:{
                        xs: 0,
                        sm: 2,
                        md: 0
                      }
                    }}>
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
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Enter Payment Amount
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={handleClosePaymentModal} variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handlePaymentSubmit} variant="contained" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
};


export default Invoice;
