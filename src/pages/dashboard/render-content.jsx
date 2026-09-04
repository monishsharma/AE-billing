import { Box, Grid, Paper, Typography } from "@mui/material";
import CardV2 from "../../components/card-v2";
import { AREA_CHART_STYLING, CARD_CONTENT, getValueByPath, injectEmptyArray } from "./constant";
import { COMPANY_TYPE, DASHBOARD_CARD_KEYS, DASHBOARD_TAB_TYPE, MONTHLY_CHART_LABELS, RESPONSIVE_WIDTH_STYLE } from "../../constants/app-constant";
import { calculateBusinessGrowth } from "../../helpers/report-helper";
import AreaChart from "../../components/area-chart";
import UnpaidInvoices from "./unpaid-invoices-list";
import TopCustomers from "./top-customers";
import { formatAmount } from "../../helpers/price-formatter";
import { getBreakdownData } from "./selector";

export const renderContent = ({
    fy,
    data = {},
    isLoading,
    reportType,
    dateValue,
    company,
    unpaidInvoices,
    generateCSVConnect,
    loadingUnpaidInvoices
}) => {

    const monthlyData = data?.monthlyTotals || injectEmptyArray(12);
    const yearlyLabel = Object.keys(data?.fyResult || []) || injectEmptyArray(5);
    const yearlyData = Object.values(data?.fyResult || []) || injectEmptyArray(5);
    const areaChartdata = {
        labels: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? MONTHLY_CHART_LABELS : yearlyLabel,
        datasets: [
            {
                label: "Sales",
                data: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? monthlyData : yearlyData,
                ...AREA_CHART_STYLING
            },
        ],
    };
    const apiDataKey = reportType === DASHBOARD_TAB_TYPE.MONTHLY ? "monthly" : "yearly";

    const breakdownData = getBreakdownData({
        company,
        data,
        apiDataKey,
    });

    return (
        <>
            <Grid container spacing={2} mt={2}>
                {
                    CARD_CONTENT.filter(({showDataFor}) => !showDataFor || showDataFor.includes(company))
                    .map((card, key) => {

                        const getValue = (cardInfo) => {
                            const { valueKey, nestedKey, needFormating } = cardInfo;

                            const baseValue = getValueByPath(data, valueKey);

                            let value = baseValue?.[apiDataKey];

                            if (nestedKey) {
                                value = value?.[nestedKey];
                            }

                            return needFormating
                                ? formatAmount(value ?? 0)
                                : value ?? 0;
                        };

                        const getSpanText = (cardInfo) => {

                            const { spanText, key } = cardInfo;
                            const suffix = reportType === DASHBOARD_TAB_TYPE.MONTHLY ? "month" : "year";

                            if ([DASHBOARD_CARD_KEYS.SALES, DASHBOARD_CARD_KEYS.GROWTH].includes(key)) {
                                return `${spanText} ${suffix} `
                            }

                            return spanText;

                        }

                        return (
                            <Grid
                                key={key}
                                item
                                sx={{
                                    // ...RESPONSIVE_WIDTH_STYLE
                                }}
                                size={{ xs: 12, md: 6, lg: 3 }}
                            // md={4}
                            >
                                <CardV2
                                    index={key}
                                    title={card.title}
                                    cardKey={card.key}
                                    value={getValue(card)}
                                    bgColor={card.bgColor}
                                    isLoading={isLoading}
                                    cardIcon={card.icon}
                                    iconColor={card.iconColor}
                                    spanText={getSpanText(card)}
                                    growth={calculateBusinessGrowth({
                                        apiDataKey,
                                        data,
                                        cardKey: card.key
                                    })}
                                    showGrowthIcon={card.showGrowthIcon}
                                    cardIconBgColor={card.iconBGColor}
                                />
                            </Grid>
                        )
                    })
                }


            </Grid>
            <Grid container mt={2} sx={{ ...RESPONSIVE_WIDTH_STYLE }} spacing={2}>
                <Grid item size={{ sm: 12, lg: 6 }} >
                    <AreaChart
                        data={areaChartdata}
                        isLoading={isLoading}
                        dateValue={dateValue}
                        reportType={reportType}
                        financialYear={fy}
                    />
                </Grid>
                <Grid item size={{ sm: 12, lg: 6 }}>
                    <UnpaidInvoices
                        company={company}
                        isLoading={loadingUnpaidInvoices}
                        unpaidInvoices={unpaidInvoices}
                        apiDataKey={apiDataKey}
                        generateCSVConnect={generateCSVConnect}
                        dateValue={dateValue}
                    />
                </Grid>
            </Grid>
            <Grid container mt={2} sx={{ ...RESPONSIVE_WIDTH_STYLE }} spacing={2}>
                <Grid item size={{ xs: 12, sm: 12, lg: 6 }}>
                    <TopCustomers
                        reportType={reportType}
                        title={ company === COMPANY_TYPE.ASHOK ? "Sales by Category": "Top Customers"}
                        data={breakdownData}
                        labelKey="label"
                        valueKey="value"
                    />
                </Grid>
                {/* <Grid item size={{xs: 12, sm: 4}}>
                    <TopCustomers />
                </Grid>
                <Grid item size={{xs: 12, sm: 4}}>
                    <TopCustomers />
                </Grid> */}
            </Grid>
        </>
    )
}