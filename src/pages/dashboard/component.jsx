import React, { forwardRef, useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "../../components/card";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DatePicker from "react-datepicker";
import { Col, Row } from "react-bootstrap";
import { COMPANY_TYPE } from "../../constants/app-constant";
import PageLoader from "../../components/page-loader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { isMobileDevice } from "../../helpers/is-mobile-device";
import { tableConstants } from "./tableConstant";
import Table from "../../components/table";
import Swal from "sweetalert2";
import AccessDenied from "../../components/access-denied";

const Dashboard = ({ auth, getReportConnect, resetReducerConnect, generateCSVConnect, getUnpaidInvoicesConnect }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(COMPANY_TYPE.ASHOK);
  const [dateValue, setDateValue] = useState(new Date());
  const [reportStat, setReportStat] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [unpaidInvoicesLoading, setUnpaidInvoicesLoading] = useState(true);
  const { user: {isAdmin} = {} } = auth;
  const isCompanyAshok = value === COMPANY_TYPE.ASHOK;
  const monthlyData = reportStat?.monthlyTotals || Array(12).fill(0);
  const yearlyData = reportStat?.yearlyTotals || Array(12).fill(0);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const options = {
    responsive: true,
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
        text: "Customer Breakdown",
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
    labels,
    datasets: [
      {
        label: "₹ Sales",
        data: monthlyData,
        backgroundColor: "red",
      },
    ],
  };

  const getLabel = () => {
    let label = [];
    let amount = [];
    if (reportStat && reportStat.customerTotals) {
    const itemKey = isCompanyAshok ? reportStat.ashokSalesType : reportStat.customerTotals
      Object.keys(itemKey).map((key) => label.push(key));
      Object.keys(itemKey).map((key) => amount.push(itemKey[key].total));
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
      company: value,
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

  }, [value, dateValue]);


  useEffect(() => {
    setUnpaidInvoicesLoading(true);
    getUnpaidInvoicesConnect({
      company: value,
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

  }, [value,dateValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick, className = "customBtn", size }, ref) => (
    <div className="d-grid ">
      <Button onClick={onClick} variant="contained" size={size} ref={ref} className={className}>
        {value}
      </Button>
    </div>
  ));

  const handleDateChange = (selectedDate) => {
    setDateValue(selectedDate);
  };


  const goToInvoiceDetail = (e, row) => {
        e.stopPropagation(); // prevent triggering row click
        resetReducerConnect();
        window.open(`/edit/invoice/${row._id}`, '_blank');
  }

  const exportCSV = () => {
    setBtnLoading(true);
    generateCSVConnect({
      company: value,
      month: dateValue.getMonth() + 1,
      year: dateValue.getFullYear(),
      forUnpaid: true,
    })
      .then(({ data, headers }) => {
        const blob = new Blob([data], { type: "text/csv" }); // Convert text to Blob
        const url = window.URL.createObjectURL(blob);
        const contentDisposition = headers.get("Content-Disposition");

        let filename = `${value} UNPAID INVOICES .csv`; // Fallback
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
  }

  const renderUnpaidInvoices = () => {
    return (
      <Paper sx={{ height: {
                  xs: "auto",
                  sm: "auto",
                  md: 400,
                }, overflow: "auto" }}>
                  <Grid container spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
                    <Grid item size={{ md: 4 }} sx={{alignItems: "center"}}>
                      <Typography  variant="h6" color="red" className="fw-bold ">{`${unpaidInvoices?.length} Unpaid Invoices`}</Typography>
                    </Grid>

                    <Grid item size={{ md:8 }} sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                      {!!(unpaidInvoices?.length) && <Grid>
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
                        data={unpaidInvoices || []}
                        hoverable={true}
                        cols={tableConstants()}
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
        <div className="d-flex align-items-center w-100">

        </div>
        <Grid container spacing={2}>
          <Grid item size={{ md: 3, xs: 12 }}>
            <Card
              symbol={true}
              count={reportStat?.totalInvoiceAmount}
              title={"Total Sales"}
              CardIcon={CurrencyRupeeIcon}
              percentage={reportStat?.invoiceAmountChange?.percentage}
              growth={reportStat?.invoiceAmountChange?.growth}
            />
          </Grid>
          <Grid item size={{ md: 3, xs: 12 }}>
            <Card
              count={reportStat?.totalItems}
              title={"Total Invoices"}
              CardIcon={ReceiptIcon}
              percentage={reportStat?.invoiceCountChange?.percentage}
              growth={reportStat?.invoiceCountChange?.growth}
            />
          </Grid>
          <Grid item size={{ md: 3, xs: 12 }}>
            <Card
              symbol={true}
              count={reportStat?.unpaidTotal}
              title={"Total Unpaid Amount"}
              CardIcon={CurrencyRupeeIcon}
              // percentage={"16.9"}
              // growth={true}
              showPercentage={false}
            />
          </Grid>
          <Grid item size={{ md: 3, xs: 12 }}>
            <Card
              symbol={true}
              count={reportStat?.paidTotal}
              title={"Total Paid Amount"}
              CardIcon={CurrencyRupeeIcon}
              // percentage={"16.9"}
              // growth={true}
              showPercentage={false}
            />

          </Grid>
          <Grid container size={{ md: 12 }} mt={4}>
            {
              <Grid item size={{ md: 6 }} >
                {renderUnpaidInvoices()}
              </Grid>
            }
            <Grid item size={{ md: 6 }} sx={{width: "100%"}}>
              <Bar key={value + dateValue} options={options} data={data} height={isMobileDevice()?350: 200} />
            </Grid>
            <Grid item size={{ md: 12 }} sx={{width: "100%"}}>
              <Box sx={{ maxWidth: 400, margin: "auto" }}>
                  <Pie data={pieData} options={pieOptions} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

   if (!isAdmin) {
    return <AccessDenied />
  }

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div>
        <Row className="w-100 mt-4" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Col><h2 className="fw-bold">Dashboard</h2></Col>
            <Col sm={12} md={6} lg={2}>
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
          </Row>
      </div>
      <div className="mt-2">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="dashboard tabs" textColor="black"
                            sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "#000", // set your custom color
                                },
                            }}>
              <Tab label="Ashok" value={COMPANY_TYPE.ASHOK} />
              <Tab label="Padma" value={COMPANY_TYPE.PADMA} />
            </TabList>
          </Box>
          <TabPanel
            sx={{
              p: {
                xs: 0,
                sm: 2,
                md: 0
              },
              mt: 2
            }}
            value={COMPANY_TYPE.ASHOK}
          >
            {renderReport()}
          </TabPanel>
          <TabPanel
            sx={{
              p: {
                xs: 0,
                sm: 2,
                md: 0,
              },
            }}
            value={COMPANY_TYPE.PADMA}
          >
            {renderReport()}
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default Dashboard;
