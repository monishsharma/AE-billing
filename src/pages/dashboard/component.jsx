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
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from "@mui/x-charts";

const Dashboard = ({
  getReportConnect
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(COMPANY_TYPE.ASHOK);
  const [dateValue, setDateValue] = useState(new Date());
  const [reportStat, setReportStat] = useState({});
  const monthlyData = reportStat?.monthlyTotals || Array(12).fill(0);
  const config = {
    height: 350,
    margin: { left: 40 },
    hideLegend: true,
  };

  useEffect(() => {
    setIsLoading(true);
    getReportConnect(({company:value,  month: dateValue.getMonth() +1 , year: dateValue.getFullYear()}))
    .then((res) => {
      setReportStat(res);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setReportStat({});
    })
  }, [value, dateValue])


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
    setDateValue(selectedDate)
}
  console.log(reportStat?.monthlyTotals)
  const renderReport = () => {
    return (
      <>
        <div className="d-flex align-items-center w-100">
              <Row className="w-100">
                <Col sm={2}>
                  <div className="mb-4 d-flex justify-content-start">
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
              <Grid size={{md: 12}} mt={4}>
                <Paper variant="elevation" elevation={4} square={false}>
                    <Typography variant="h6" padding={1}>
                      Sales per month
                    </Typography>
                    <BarChart
                     {...config}
                        xAxis={[{
                          data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                          scaleType: 'band',
                          tickLabelInterval: 1,
                          label: 'Month',
                        }]}
                        yAxis={[{
                          min: 0,
                          max: 4000000,
                          colorMap: {
                            type: 'piecewise',
                            thresholds: [0],
                            colors: value=== COMPANY_TYPE.ASHOK ? ['orange'] : ["yellow"],
                          },
                          tickMinStep: 1000000,
                          label: 'Amount (₹)',
                        }]}
                        series={[
                          { data: monthlyData }
                        ]}
                        height={400}
                  />
                  </Paper>
              </Grid>
              {/* <Grid size={{md: 6}} mt={4}>
                <Paper variant="elevation" elevation={4} square={false}>
                <Typography variant="h6" padding={1}>
                      Sales per month
                    </Typography>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: reportStat?.unpaidTotal, label: 'Unpaid' },
                            { id: 1, value: reportStat?.paidTotal, label: 'Paid' },
                          ],
                        },
                      ]}
                      width={200}
                      height={200}
                    />
                  </Paper>
              </Grid> */}
            </Grid>
      </>

    )
  }

  if (isLoading) return <PageLoader />

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
          <TabPanel value={COMPANY_TYPE.ASHOK}>
            {renderReport()}
          </TabPanel>
          <TabPanel value={COMPANY_TYPE.PADMA}>
            {renderReport()}
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default Dashboard;
