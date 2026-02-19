import React, { forwardRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardContainer from "../../components/card";
import DatePicker from "react-datepicker";
import { COMPANY_TYPE, DASHBOARD_TAB_TYPE } from "../../constants/app-constant";
import PageLoader from "../../components/page-loader";
import { toast, Bounce } from "react-toastify";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  scales,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { isMobileDevice } from "../../helpers/is-mobile-device";
import { tableConstants } from "./tableConstant";
import Table from "../../components/table";
import Swal from "sweetalert2";
import AccessDenied from "../../components/access-denied";
import PaymentConfirmationModal from "../../components/payment-confirmation-modal";
import { useNavigate, useParams } from "react-router-dom";
import CompanyTabs from "../../components/company-tabs";

const Dashboard = ({ auth, getReportConnect, resetReducerConnect, generateCSVConnect, getUnpaidInvoicesConnect, updateInvoiceConnect }) => {

      const Navigate = useNavigate();
  const [reportType, setReportType] = useState(DASHBOARD_TAB_TYPE.MONTHLY);
  const [isLoading, setIsLoading] = useState(true);
  const [dateValue, setDateValue] = useState(new Date());
  const [financialYear, setFinancialYear] = useState("");
  const [runEffect, setRunEffect] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [reportStat, setReportStat] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [unpaidInvoicesLoading, setUnpaidInvoicesLoading] = useState(true);
  const { user: {isAdmin} = {} } = auth;
  const { company } = useParams();
  const isCompanyAshok = company === COMPANY_TYPE.ASHOK;
  const monthlyData = reportStat?.monthlyTotals || Array(12).fill(0);
  const yearlyData = Object.values(reportStat?.fyResult || []) || Array(5).fill(0);
  const yearlyLabel = Object.keys(reportStat?.fyResult || []) || Array(5).fill(0);
  const apiDataKey = reportType === DASHBOARD_TAB_TYPE.MONTHLY ? "monthly" : "yearly";
  const text = reportType === DASHBOARD_TAB_TYPE.MONTHLY ? "Month" : "Year";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

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

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
       y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Per Month",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: isCompanyAshok ? "Sales Type" : "Customer Breakdown",
      },
    },

  };

  const labels = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];

  const data = {
    labels: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? labels : yearlyLabel,
    datasets: [
      {
        label: "₹ Sales",
        data: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? monthlyData : yearlyData,
        backgroundColor: "rgb(0, 0, 0)",
        barThickness: 10,
      },
    ],
  };

  const getLabel = () => {
    let label = [];
    let amount = [];
    if (reportStat && reportStat.customerBreakdown) {
    const itemKey = isCompanyAshok ? reportStat.itemBreakdown[apiDataKey] : reportStat.customerBreakdown[apiDataKey];
    // const itemKey = reportStat.customerBreakdown
      Object.keys(itemKey).map((key) => label.push(key));
      Object.keys(itemKey).map((key) => isCompanyAshok ? amount.push(itemKey[key].total) : amount.push(itemKey[key]));
    }

    return {label, amount};
  };


  const pieData = {
    labels: getLabel().label,
    datasets: [
      {
        label: isCompanyAshok ?  "Sales Type " : "Sales to company",
        data: getLabel().amount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    getReportConnect({
      company,
      month: dateValue.getMonth() + 1,
      year: dateValue.getFullYear(),
    })
      .then((res) => {
        setReportStat(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setReportStat({});
      });

  }, [company, dateValue]);


  useEffect(() => {
    setUnpaidInvoicesLoading(true);
    getUnpaidInvoicesConnect({
      company,
      month: dateValue.getMonth() + 1,
      year: dateValue.getFullYear(),
    })
      .then((res) => {
        setUnpaidInvoices(res);
        setUnpaidInvoicesLoading(false);
      })
      .catch(() => {
        setUnpaidInvoices([])
        setUnpaidInvoicesLoading(false);
      });

  }, [company,dateValue, runEffect]);

  const handleChange = (event, newValue) => {
    Navigate(`/dashboard/${newValue}`);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick, className = "customBtn", size }, ref) => (
      <Button fullWidth onClick={onClick} variant="contained" size={size} ref={ref} className={className}>
        {value}
      </Button>
  ));

  const handleDateChange = (selectedDate) => {
    if (reportType === DASHBOARD_TAB_TYPE.YEARLY) {
      const fyStartYear =
        selectedDate.getMonth() >= 3
          ? selectedDate.getFullYear()
          : selectedDate.getFullYear() - 1;

      const fyEndYear = String(fyStartYear + 1).slice(-2);

      const fy = `${fyStartYear}-${fyEndYear}`;

      console.log("Selected FY:", fy);

      setDateValue(selectedDate);
      setFinancialYear(fy); // <- store FY string
    }
    else {
      setDateValue(selectedDate);
    }
  };



  const goToInvoiceDetail = (e, row) => {
        e.stopPropagation(); // prevent triggering row click
        resetReducerConnect();
        window.open(`/edit/invoice/${row._id}`, '_blank');
  }

  const exportCSV = () => {
    setBtnLoading(true);
    generateCSVConnect({
      company,
      month: dateValue.getMonth() + 1,
      year: dateValue.getFullYear(),
      forUnpaid: true,
      unpaidInvoicesList: unpaidInvoices[apiDataKey] || []
    })
      .then(({ data, headers }) => {
        const blob = new Blob([data], { type: "text/csv" }); // Convert text to Blob
        const url = window.URL.createObjectURL(blob);
        const contentDisposition = headers.get("Content-Disposition");

        let filename = `${company} UNPAID INVOICES .csv`; // Fallback
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

  const handleOpenPaymentModal = React.useCallback((invoice) => {
          setSelectedInvoice(invoice);
          setOpenPaymentModal(true);
          setPaymentAmount(invoice.goodsDescription.Total);
      }, []);

  const chekboxhandler = React.useCallback(async (e, row) => {
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

  const renderUnpaidInvoices = () => {
    return (
      <Paper sx={{ height: "500px", overflow: "auto", p: 1 }}>
                  <Grid container spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
                    <Grid item size={{ md: 4 }} sx={{alignItems: "center"}}>
                      <Typography  variant="h6" color="red" className="fw-bold ">{`${unpaidInvoices[apiDataKey]?.length} Unpaid Invoices`}</Typography>
                    </Grid>

                    <Grid item size={{ md:8 }} sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                      {!!(unpaidInvoices[apiDataKey]?.length) && <Grid>
                        <Button
                          onClick={exportCSV}
                          loading={btnLoading}
                          size="small"
                          variant="contained"
                          className="outlinedCustomBtn"
                        >
                            <span style={{ visibility: btnLoading ? "hidden" : "visible", fontWeight: "bold" }}>
                                      Export
                                  </span>
                        </Button>
                      </Grid>}
                    </Grid>

                  </Grid>
                  <div className="customTable" style={{marginTop: "20px", overflow: "auto"}}>
                    <Table
                        bordered={true}
                        data={unpaidInvoices[apiDataKey] || []}
                        hoverable={true}
                        cols={tableConstants({isCompanyAshok, chekboxhandler})}
                        isClickable={true}
                        isQueryRunning={unpaidInvoicesLoading}
                        onClick={goToInvoiceDetail}
                        emptyTableErrorMsg={"No Unpaid Invoice Found"}
                    />
                  </div>
                </Paper>
    )
  }

  const renderReport = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid size={{
            xs: 12,
            sm: 12,
            md: 5
          }}>
            <Paper sx={{
              minHeight: "370px"
            }}>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
                    <CardContainer
                      text={text}
                      title="Sales"
                      symbol={true}
                      style={{
                        backgroundColor: "rgba(57, 73, 171, 0.125)",
                        color: "rgb(57, 73, 171)"
                      }}
                      count={reportStat?.sales?.[apiDataKey]}
                      percentage={reportStat?.growth?.sales?.[apiDataKey].growthPercentage}
                      growth={reportStat?.growth?.sales?.[apiDataKey].hasGrow}
                      showPercentage={reportStat?.sales?.[apiDataKey] > 0}
                    />
                  </Grid>
                  {isCompanyAshok && <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
                    <CardContainer
                      text={text}
                      title="Total Tons"
                      showPercentage={reportStat?.tons?.[apiDataKey] > 0}
                      count={reportStat?.tons?.[apiDataKey]}
                      percentage={reportStat?.growth?.tons?.[apiDataKey]?.growthPercentage}
                      growth={reportStat?.growth?.tons?.[apiDataKey]?.hasGrow}
                    />
                  </Grid>}
                  <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
                    <CardContainer
                      text={text}
                      title=" Unpaid Amount"
                      symbol={true}
                      showPercentage={false}
                      count={reportStat?.payment?.[apiDataKey]?.unpaid}
                      style={{
                        backgroundColor: "rgb(255,204,0)",
                        color: "white"
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 12, md: 6 }}>
                    <CardContainer
                      text={text}
                      title=" Paid Amount"
                      symbol={true}
                      showPercentage={false}
                      style={{
                        backgroundColor: "rgb(76, 175, 80)",
                        color: "white"
                      }}
                      count={reportStat?.payment?.[apiDataKey]?.paid}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{
            sm: 12,
            md: 7
          }}>
            <Paper sx={{
              minHeight: {
                xs: "300px",
                md: "370px"
              }
            }}>
               <Box sx={{ p: 2 }}>
                  <Bar height={ isMobileDevice() ? "300px" : "auto"} key={company + dateValue} options={options} data={data}  />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item size={{ md: 5 }} sx={{width: "100%"}}>
              <Paper>
                <Box sx={{ p: 2 }}>
                  <Pie key={company + dateValue} options={pieOptions} data={pieData}  />
                </Box>
              </Paper>
            </Grid>
            <Grid item size={{ md: 7 }} sx={{width: "100%"}}>
              {renderUnpaidInvoices()}
            </Grid>
          </Grid>
        </Box>
      </>
    );
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

   if (!isAdmin) {
    return <AccessDenied />
  }

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div>
        <Grid container spacing={2} sx={{justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", md: "row" }}}>
          <Grid item size={{ md: 4 }}>
            <Typography variant="h4" className="fw-bold ">Dashboard</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "flex-end",  // 👈 ensures right alignment
              alignItems: "center",
              gap: 2,
              width: {
                xs: "100%",
                sm: "auto"
              },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <ButtonGroup
              sx={{
                  width: {
                    xs: "100%",
                    sm: "auto"
                  }
                }}
            aria-label="outlined button group" disableElevation>
              <Button
                fullWidth
                onClick={() => {
                  setReportType(DASHBOARD_TAB_TYPE.MONTHLY);
                  setDateValue(new Date());
                }}
                className={reportType === DASHBOARD_TAB_TYPE.MONTHLY ? "customBtn" : "outlinedCustomBtn"}
              >
                Monthly
              </Button>
              <Button
             fullWidth
                className={reportType === DASHBOARD_TAB_TYPE.YEARLY ? "customBtn" : "outlinedCustomBtn"}
                onClick={() => setReportType(DASHBOARD_TAB_TYPE.YEARLY)}
              >
                Yearly
              </Button>
            </ButtonGroup>
            <Box className={`m-1`} sx={{
                width: {
                    xs: "100%",
                    sm: "auto",
                },
            }}  >
            <DatePicker
              selected={dateValue}
              {
                ...(reportType === DASHBOARD_TAB_TYPE.MONTHLY ?
                  {
                    showMonthYearPicker: true,
                    dateFormat: "MMMM, yyyy",
                  } :
                  {
                    showYearPicker: true,
                    dateFormat: "yyyy",
                    minDate:new Date(2025, 0, 1)

                  }
                )
              }
              withPortal
              onChange={handleDateChange}
              customInput={<ExampleCustomInput className="customBtn" />}
            />
            </Box>
          </Grid>
        </Grid>
        {/* <Row className="w-100 mt-4" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Col><h2 className="fw-bold">Dashboard</h2></Col>
            <Col sm={12} md={6} lg={3}>
              <div className="d-flex ">
                <DatePicker
                  selected={dateValue}
                  wrapperClassName="w-100"
                  showMonthYearPicker
                  onChange={handleDateChange}
                  dateFormat="MMMM, YYYY"
                  customInput={<ExampleCustomInput className="customBtn" />}
                />
              </div>
            </Col>

          </Row> */}
      </div>
      <div className="mt-2">
        <CompanyTabs
            value={company}
            onChange={handleChange}
            renderContent={renderReport}
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
    </>
  );
};

export default Dashboard;
