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

const Dashboard = ({ getReportConnect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(COMPANY_TYPE.ASHOK);
  const [dateValue, setDateValue] = useState(new Date());
  const [reportStat, setReportStat] = useState({});
  const monthlyData = reportStat?.monthlyTotals || Array(12).fill(0);

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
      Object.keys(reportStat.customerTotals).map((key) => label.push(key));
      Object.keys(reportStat.customerTotals).map((key) => amount.push(reportStat.customerTotals[key].total));
    }

    return {label, amount};
  };

  const pieData = {
    labels: getLabel().label,
    datasets: [
      {
        label: "Sales to company",
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="d-grid ">
      <Button onClick={onClick} variant="contained" size="small" ref={ref}>
        {value}
      </Button>
    </div>
  ));

  const handleDateChange = (selectedDate) => {
    setDateValue(selectedDate);
  };
  console.log(reportStat?.monthlyTotals);
  const renderReport = () => {
    return (
      <>
        <div className="d-flex align-items-center w-100">
          <Row className="w-100">
            <Col sm={2}>
              <div className="mb-4 d-flex justify-content-start mt-4">
                <DatePicker
                  selected={dateValue}
                  wrapperClassName="w-100"
                  showMonthYearPicker
                  onChange={handleDateChange}
                  dateFormat="MMMM, YYYY"
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </Col>
          </Row>
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
            <Grid item size={{ md: 6 }} sx={{width: "100%"}}>
              <Bar key={value + dateValue} options={options} data={data} height={isMobileDevice()?350: 200} />;
            </Grid>
            <Grid item size={{ md: 6 }} sx={{width: "100%"}}>
              <Box sx={{ maxWidth: 400, margin: "auto" }}>
                <Pie data={pieData} options={pieOptions} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div className={`mt-3`}>
        <h2 className="fw-bold">Dashboard</h2>
      </div>
      <div className="mt-2">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="dashboard tabs">
              <Tab label="Ashok" value={COMPANY_TYPE.ASHOK} />
              <Tab label="Padma" value={COMPANY_TYPE.PADMA} />
            </TabList>
          </Box>
          <TabPanel
            sx={{
              p: {
                xs: 0,
                sm: 2,
                md: 0,
              },
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
