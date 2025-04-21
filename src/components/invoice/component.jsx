import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./invoice.module.css";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { columns, columns1 } from "./selector";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Chip } from "@mui/material";
import { COMPANY_TYPE, STEPPER_NAME } from "../../constants/app-constant";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Swal from "sweetalert2";
import PageLoader from "../page-loader";
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { ColumnsPanelTrigger, DataGrid, ToolbarButton, Toolbar, FilterPanelTrigger, ExportCsv, ExportPrint, QuickFilterControl, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";

const Invoice = ({
    invoiceForm,
    getInvoiceListConnect,
    getBillPdfConnect,
    generateCSVConnect,
    resetReducerConnect
}) => {
    const navigate = useNavigate();

    const {_id = ""} = invoiceForm || {}

    const getDateValue = () => {

      const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // January is 0, December is 11
    const day = today.getDate();

    let salaryMonth, salaryYear;

    if (day <= 10) {
        if (month === 0) {
            salaryMonth = 11;
            salaryYear = year - 1;
        } else {
            salaryMonth = month - 1;
            salaryYear = year;
        }
    } else {
        salaryMonth = month;
        salaryYear = year;
    }

    return new Date(salaryYear, salaryMonth);
  }

    const [isLoading, setIsLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [totalpage, setTotalpage] = useState(0);
    const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [dateValue, setDateValue] = useState(new Date(getDateValue()));
  console.log()

    const onClick = () => {
        if (_id){
            resetReducerConnect()
        }
        navigate("/new/invoice")
    }


    useEffect(() => {
      setIsLoading(true);
      getInvoiceListConnect({ company: value, page: paginationModel.page + 1, limit: paginationModel.pageSize }) // page +1 because frontend is 0-based
        .then((res) => {
          setInvoices(res.data);
          setTotalpage(Number(res.totalItems)); // must be total documents, not pages
          setIsLoading(false);
        })
        .catch(() => {
          setInvoices([]);
          setIsLoading(false);
        });
    }, [value, paginationModel]);

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

        try {
          setIsLoading(true);
          const pdfResponse = await getBillPdfConnect(payload, {
            responseType: "blob",
            headers: {
              Accept: "application/pdf",
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

          setIsLoading(false);
        } catch (pdfErr) {
          console.error("PDF generation error", pdfErr);
          Swal.fire({
            icon: "error",
            text: "Failed to generate PDF",
          });
          setIsLoading(false);
        }
      };



      const columns1 = [
        {
            field: 'Invoice No',
            headerName: 'Invoice No',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 150,
            valueGetter: (value, row) => `${row.invoiceDetail.invoiceNO}`,

          },
          {
            field: 'Billed To',
            headerName: 'Billed To',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 350,
            valueGetter: (value, row) => `${row.buyerDetail.name}`,
          },
          {
            field: 'date',
            headerName: 'Date',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            valueGetter: (value, row) => `${row.invoiceDetail.invoiceDate}`,
          },
          {
            field: 'status',
            headerName: 'Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            renderCell: (value) => <Chip label={value.row.paid ? "Paid" : "Unpaid"} size="small" variant="Outlined" color={value.row.paid ? "primary" : "error"} />,
            // renderCell: (value, row) => ,
          },
          {
            field: 'Amount',
            headerName: 'Amount',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            valueGetter: (value, row) => `${parseFloat(row.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          },
          {
            field: 'Bill',
            headerName: 'Bill',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
            renderCell:(value)=>(
                <>
                    <IconButton onClick={(e) => handleDownload(e,value.row)} size="small">
                        <FileCopyIcon />
                        </IconButton>
                        <IconButton onClick={(e) => handleDownload(e,value.row, true)} size="small">
                        <DownloadIcon />
                    </IconButton>
                </>
            )
        },
      ];


      const downloadCSV = async () => {
        generateCSVConnect({ company: value, month: dateValue.getMonth() + 1, year: dateValue.getFullYear() })
          .then((csvText) => {
            const blob = new Blob([csvText], { type: 'text/csv' }); // Convert text to Blob
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${value} SALES APR 2025.csv`; // Customize filename here
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
          })
          .catch((err) => {
            console.log(err);
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
            <div className="d-flex align-items-center justify-content-between" style={{width: "100%"}}>
                <div>
                    <GridToolbarQuickFilter />
                </div>
                <div className="d-flex ">
                <div className={`m-2 ${styles.end} `}>

                        <DatePicker
                            selected={dateValue}
                            showMonthYearPicker={true}
                            dateFormat="MMMM, YYYY"
                            onChange={handleDateChange}
                            customInput={<ExampleCustomInput />}
                        />
                    </div>
                    <div className={`m-2 ${styles.end}`}>
                        <Button onClick={downloadCSV} variant="contained" size="small">
                            Export as CSV
                        </Button>
                    </div>

                    <div className={`m-2 ${styles.end}`}>
                      <Button onClick={onClick} variant="contained" size="small">
                            Create Invoice
                        </Button>
                    </div>
                </div>
            </div>
        </GridToolbarContainer>
      )


    const renderInvoices = () => (
        <Paper sx={{ width: '100%' }}>

            <DataGrid
                rows={invoices}
                columns={columns1}
                rowSelection={false}
                onRowClick={(e,row) => handleRowClick(e, row)}
                getRowId={(row) => row._id}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                paginationMode="server"
                rowCount={totalpage}
                showToolbar
                slots={{ toolbar: CustomToolbar }}
                sx={{ width: '100%',  '.MuiDataGrid-cell:focus': {
                    outline: 'none'
                  },
                  // pointer cursor on ALL rows
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer'
                  } }}
            />

            </Paper>

    )

    if (isLoading) return <PageLoader />

    return (
        <React.Fragment>

            <div className={`mt-3`}>
                <h2 className="fw-bold">Invoice</h2>
            </div>

            <div className="mt-2">

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label={COMPANY_TYPE.ASHOK} value={COMPANY_TYPE.ASHOK} />
                        <Tab label={COMPANY_TYPE.PADMA} value={COMPANY_TYPE.PADMA} />
                    </TabList>
                </Box>
                <TabPanel value={COMPANY_TYPE.ASHOK}>
                    {renderInvoices()}
                </TabPanel>
                <TabPanel value={COMPANY_TYPE.PADMA}>
                    {renderInvoices()}
                </TabPanel>
            </TabContext>



            </div>

        </React.Fragment>
    );
};


export default Invoice;
