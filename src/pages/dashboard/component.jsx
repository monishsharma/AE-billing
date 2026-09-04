import React, { useEffect, useState } from 'react';
import HeroSection from "../../components/hero-section";
import { DASHBOARD_TAB_TYPE, GLOBAL_FLEX_STYLING, RESPONSIVE_WIDTH_STYLE } from "../../constants/app-constant";
import { Box, Button, ButtonGroup, Skeleton, Typography } from '@mui/material';
import FYSelect from "../../components/FY-Select";
import DatePicker from '../../shared/components/date-picker/custom-input';
import { BTN_GROUP, getCurrentFY, getLastUpdatedText } from './constant';
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CompanyTabs from '../../components/company-tabs';
import { useNavigate, useParams } from 'react-router-dom';
import { renderContent } from './render-content';
import { getFinancialYear } from './selector';


const Dashboard = ({
  getReportConnect,
  generateCSVConnect,
  getUnpaidInvoicesConnect
}) => {

  const Navigate = useNavigate();
  const { company } = useParams();
  const [, setTick] = useState(0);
  const [financialYear, setFinancialYear] = useState(getFinancialYear(new Date()).fy || "");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingUnpaidInvoices, setLoadingUnpaidInvoices] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [reportStat, setReportStat] = useState({});
  const [value, setValue] = useState(getCurrentFY());
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);
  const [reportType, setReportType] = useState(DASHBOARD_TAB_TYPE.MONTHLY);

  const handleChange = (event, newValue) => {
    Navigate(`/dashboard/${newValue}`);
  };

  const fetchData = () => {
    setIsLoading(true);
    getReportConnect({
      company,
      type: reportType,
      month: dateValue.getMonth() + 1,
      year: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? dateValue.getFullYear() :  value,
    })
    .then((res) => {
        setReportStat(res);
        setLastUpdated(new Date());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
        setReportStat({});
      });
  }

  const fetUnpaidInvoices = () => {
    setLoadingUnpaidInvoices(true);
    getUnpaidInvoicesConnect({
      company,
      month: dateValue.getMonth() + 1,
      year: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? dateValue.getFullYear() :  value,

    })
      .then((res) => {
        setUnpaidInvoices(res);
        setLoadingUnpaidInvoices(false);
      })
      .catch(() => {
        setUnpaidInvoices([])
        setLoadingUnpaidInvoices(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [company, dateValue, reportType])

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetUnpaidInvoices()
  }, [company,dateValue ,value, reportType]);


  const handleDateChange = (selectedDate) => {
      const {fy, fyStartYear} = getFinancialYear(selectedDate);
      setFinancialYear(fy);
      setValue(fyStartYear);
      setDateValue(selectedDate);
  };

  const onFYChange = (fy) => {
    setIsLoading(true);
    getReportConnect({
      company,
      type: reportType,
      year: fy,
      month: 4, // default to April for FY
    }).then((res) => {
      setReportStat(res);
      setIsLoading(false);
    }).catch((err) => {
      setReportStat({});
      setIsLoading(false);
    })
  }

  const handleRefresh = () => {
    fetchData();
    fetUnpaidInvoices();
  }


  return (
    <>
      <Box
        sx={{
          ...GLOBAL_FLEX_STYLING,
          alignItems: {
            xs: "flex-start",
            lg: "center"
          }
        }}
      >
        <HeroSection
          pageTitle={"Dashboard"}
          showButton={false}
          style={{ mt: 1 }}
          subtitle={"Business Performance Overview"}
        />
        <Box
          sx={{
            ...GLOBAL_FLEX_STYLING,
            ...RESPONSIVE_WIDTH_STYLE,
            justifyContent: "flex-end",
            gap: {
              xs: 0,
              lg: 2
            }

          }}
        >
          <ButtonGroup
            sx={{
              ...RESPONSIVE_WIDTH_STYLE,
            }}
          >
            {
              BTN_GROUP.map((btn) => {

                const onClick = (btnType) => {
                  setReportType(btnType);
                }

                return (
                  <Button
                    fullWidth
                    onClick={() => onClick(btn.type)}
                    className={reportType === btn.type ? "customBtn" : "outlinedCustomBtn"}
                  >
                    {btn.title}
                  </Button>
                )
              })
            }
          </ButtonGroup>
          <Box
            sx={{
              ...RESPONSIVE_WIDTH_STYLE,
              margin: {
                xs: 1.5,
                sm: 1
              }
            }}
          >
            {
              reportType === DASHBOARD_TAB_TYPE.MONTHLY ?
                <DatePicker
                  selected={dateValue}
                  showMonthYearPicker={true}
                  dateFormat={"MMMM, yyyy"}
                  withPortal={true}
                  customInput={true}
                  onChange={handleDateChange}
                />
                :
                <FYSelect value={value} setValue={setValue} onChange={onFYChange} />
            }

          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
                ...RESPONSIVE_WIDTH_STYLE

            }}
          >
            <Box
              sx={{
                ...GLOBAL_FLEX_STYLING,
              }}
            >

            </Box>
            <Box className="live-dot" />
            <Typography variant='body2' sx={{ color: "#64748B", fontSize: "13px", fontWeight: 500, }}>
              Last Updated{" "}
              {
              isLoading ?
                <Skeleton variant="text"
                  width={55}
                  sx={{
                    display: "inline-block",
                    fontSize: "13px",
                  }}
                />
                :
                getLastUpdatedText(lastUpdated)}

            </Typography>
            <Button
              variant="outlined"
              onClick={handleRefresh}
              disabled={isLoading}
              sx={{
                minWidth: 36,
                width: 36,
                height: 36,
                p: 0,
                borderRadius: "10px",
                color: "#64748B",
                borderColor: "#E2E8F0",

                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  borderColor: "#CBD5E1",
                },
              }}
            >
              <RefreshRoundedIcon
                sx={{
                  fontSize: 19,
                  animation: isLoading ? "spin 0.8s linear infinite" : "none",

                  "@keyframes spin": {
                    from: {
                      transform: "rotate(0deg)",
                    },
                    to: {
                      transform: "rotate(360deg)",
                    },
                  },
                }}
              />
            </Button>
          </Box>
        </Box>
      </Box>
      <CompanyTabs
        value={company}
        onChange={handleChange}
        renderContent={(companyType) =>
          renderContent({
            isLoading,
            loadingUnpaidInvoices,
            data: reportStat,
            reportType,
            company: companyType,
            unpaidInvoices,
            dateValue,
            fy: financialYear,
            generateCSVConnect
          })
        }
      />
    </>
  )
}

export default Dashboard;