import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { COMPANY_TYPE } from "../../constants/app-constant";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import DatePicker from "react-datepicker";
import PageLoader from "../../components/page-loader";

import AccessDenied from "../../components/access-denied";


const VisuallyHiddenInput = styled("input")({
  height: 1,
  width: 1,
});


export default function Payment({
  auth,
  getReportConnect,
  uploadPaymentFileConnect,
  getPaymentInfoConnect
 }) {


  // let totalPaidAmount = 0;
  const [value, setValue] = React.useState(COMPANY_TYPE.ASHOK);
  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [accordionOpen, setAccordionOpen] = React.useState(true);
  const [tabValue, setTabValue] = React.useState("summary_0"); // keep tab state per accordion
  const [totalSales, setTotalSales] = React.useState(0);

  const {user: {isAdmin} = {}} = auth || {};

  const handleDateChange = (selectedDate) => {
    setDateValue(selectedDate);
  };

  const fetchPaymentDetail = React.useCallback(async () => {
    setIsLoading(true);
    try {
      // fetch payment info
      const payments = await getPaymentInfoConnect({
        month: dateValue.getMonth() + 1,
        year: dateValue.getFullYear(),
      });
      const report = await getReportConnect({
        company: "ASHOK",
        month: dateValue.getMonth() + 1,
        year: dateValue.getFullYear(),
      });
      setResponse(payments || []);
      setTotalSales(report?.totalInvoiceAmount || 0);

      // fetch report (await) for total amount

    } catch (err) {
      console.error("Fetch failed:", err);
      setResponse([]);
    } finally {
      setIsLoading(false);
    }
  }, [dateValue, getPaymentInfoConnect]);

      React.useEffect(() => {
        fetchPaymentDetail()
    }, [dateValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  const getPaidCount = () => {
    if (tabValue.includes("summary")) return;
    const index = parseInt(tabValue.split("_")[1], 10);
    return response[index]?.updates.length || 0
  }
  console.log(response)
  const upload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select an Excel file first");
      return;
    }
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setIsLoading(true);

        const base64File = e.target.result.split(",")[1];

        const payload = {
          file: base64File,
          date: new Date(),
          fileName: file.name,
        };

        await uploadPaymentFileConnect(payload);
        await fetchPaymentDetail();

      } catch (error) {
        console.error("❌ Upload failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file); // convert to base64
  };

  const LinearProgressWithLabel =(props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

  const ExampleCustomInput = React.forwardRef(
    ({ value, onClick, className = "customBtn", size }, ref) => (
      <div className="d-grid ">
        <Button
          onClick={onClick}
          variant="contained"
          size={size}
          ref={ref}
          className={className}
        >
          {value}
        </Button>
      </div>
    )
  );

  if (!isAdmin) {
    return <AccessDenied />
  }

  if (isLoading) return <PageLoader />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={`mt-3`}>
        <h2 className="fw-bold">Payment</h2>
      </div>
      <TabContext value={value}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="dashboard tabs"
            textColor="black"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#000", // set your custom color
              },
            }}
          >
            <Tab label="Ashok" value={COMPANY_TYPE.ASHOK} />
          </TabList>
        </Box> */}
        {/* <TabPanel
          sx={{
            p: {
              xs: 0,
              sm: 2,
              md: 0,
            },
            mt: 2,
          }}
          value={COMPANY_TYPE.ASHOK}
        > */}

            <Grid container spacing={4} marginTop={2}>
              <Grid item size={{ xs: 12, md: 12 }}>
                <Box sx={{ height: "auto", overflowY: "auto" }}>
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
                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },
                      marginBottom: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">Payment Details</Typography>
                    </Box>
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
                          sm: "auto",
                        },
                        mt: {
                          xs: 2,
                          sm: 0,
                        },
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "auto",
                          },
                        }}
                      >
                        <Button
                          component="label"
                          role={undefined}
                          className="customBtn w-100"
                          size="small"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => upload(event)}
                            accept=".xls,.xlsx"
                          />
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          width: {
                            xs: "100%",
                          },
                        }}
                      >
                        <DatePicker
                          selected={dateValue}
                          wrapperClassName="w-100"
                          showMonthYearPicker
                          withPortal
                          onChange={handleDateChange}
                          dateFormat="MMMM, YYYY"
                          customInput={
                            <ExampleCustomInput
                              className="customBtn"
                              size="small"
                            />
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  {
                    response ?
                    <Stack spacing={2}>
                      <Accordion
                        sx={{ backgroundColor: "black" }}
                        expanded={accordionOpen}
                        onChange={() => setAccordionOpen(!accordionOpen)}
                      >
                        <AccordionSummary
                          expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                          aria-controls="panel2-content"
                          id="panel2-header"
                        >
                          <Box
                            sx={{
                              flexDirection: {
                                xs: "column",
                                sm: "row",
                              },
                            }}
                          >
                            <div>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "#ffffff" }}
                              >
                                {moment(dateValue).format("MMMM YYYY")}
                              </Typography>
                            </div>
                            {
                              getPaidCount() &&
                              <div>
                                <Typography
                                  variant="body2"
                                  sx={{ marginRight: "20px", color: "#ffffff" }}
                                >
                                  {" "}
                                  {getPaidCount()} Payment Processed Successfully
                                </Typography>
                              </div>
                            }
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            backgroundColor: "white",
                            height: "450px",
                            overflowY: "auto",
                            padding: "0 10px",
                          }}
                        >
                          <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                              <TabList
                                onChange={handleTabChange}
                                aria-label="lab API tabs example"
                              >
                                <Tab
                                  label={"Summary"}
                                  value={`summary_0`}
                                />
                                {response.map((item, index) => {
                                  // totalPaidAmount = item.updates.reduce((acc, curr) => {
                                  //   return acc + (parseFloat(curr?.paidAmount) || 0);
                                  // }, 0);
                                  return (
                                    <Tab
                                      label={moment(item.date).format("DD MMM")}
                                      value={`dates_${index}`}
                                    />
                                  );
                                })}
                              </TabList>
                            </Box>
                            <TabPanel value={0} sx={{ padding: "10px 0" }}>
                                <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                                  Payment Summary
                                </Typography>
                            </TabPanel>
                            {response.map((item, index) => {
                              // const amoundMarkedPaid = item.updates.reduce((acc, curr) => {
                              //   return acc + (parseFloat(curr?.paidAmount) || 0);
                              // }, 0);
                              return (
                                <TabPanel
                                  value={`dates_${index}`}
                                  key={index}
                                  sx={{ padding: "10px 0" }}
                                >
                                  <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 12 }}>
                                      <Box sx={{ height: '350px', boxSizing: 'border-box', overflow: "auto" }}>
                                        <Table
                                          stickyHeader
                                          size="small"
                                          aria-label="simple table"
                                        >
                                          <TableHead>
                                            <TableRow>
                                              <TableCell
                                                sx={{ minWidth: 125 }}
                                                align="left"
                                              >
                                                Invoice No
                                              </TableCell>
                                              <TableCell
                                                sx={{ minWidth: 155 }}
                                                align="left"
                                              >
                                                Invoice Date
                                              </TableCell>
                                              <TableCell
                                                sx={{ minWidth: 125 }}
                                                align="left"
                                              >
                                                Paid Amount
                                              </TableCell>
                                              <TableCell
                                                sx={{ minWidth: 150 }}
                                                align="left"
                                              >
                                                Invoice Amount
                                              </TableCell>
                                              <TableCell
                                                sx={{ minWidth: 100 }}
                                                align="left"
                                              >
                                                Difference
                                              </TableCell>
                                              <TableCell
                                                sx={{ minWidth: 100 }}
                                                align="left"
                                              >
                                                Status
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {item.updates.map((update, idx) => {
                                              return (
                                              <TableRow key={idx}>
                                                <TableCell align="left" sx={{
                                                  color: update.bulkUpload ? "green" : "orange"
                                                }}>
                                                  {update.referenceNumber}
                                                </TableCell>
                                                <TableCell align="left" >
                                                  {moment(update.invoiceDate).format("LL")}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {parseFloat(
                                                    update?.paidAmount || 0
                                                  ).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                  })}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {parseFloat(
                                                    update?.invoiceAmount || 0
                                                  ).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                  })}
                                                </TableCell>
                                                <TableCell align="left">
                                                  {(
                                                    parseFloat(
                                                      update?.invoiceAmount || 0
                                                    ) -
                                                    parseFloat(update?.paidAmount || 0)
                                                  ).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                  })}
                                                </TableCell>
                                                <TableCell align="left">
                                                  <Chip
                                                    size="small"
                                                    variant="outlined"
                                                    label={update.bulkUpload ? "Bulk Upload" : "Manual"}
                                                    color={update.bulkUpload ? "success" : "warning"}
                                                  />
                                                </TableCell>
                                              </TableRow>
                                            )})}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </TabPanel>
                              );
                            })}
                          </TabContext>
                        </AccordionDetails>
                      </Accordion>
                    </Stack>
                    :
                    <Typography variant="body1">No payment data available.</Typography>
                  }
                </Box>
              </Grid>
          </Grid>
        {/* </TabPanel> */}
      </TabContext>
    </Box>
  );
}
