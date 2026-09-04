import { COMPANY_TYPE, DASHBOARD_CARD_KEYS, DASHBOARD_TAB_TYPE } from "../../constants/app-constant";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export const injectEmptyArray = (size) => Array(size).fill(null);

export const getLastUpdatedText = (lastUpdated) => {
  if (!lastUpdated) return "";

  const diff = Math.floor(
    (Date.now() - lastUpdated.getTime()) / 1000
  );

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  return lastUpdated.toLocaleDateString("en-IN");
};

export const getValueByPath = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const BTN_GROUP = [
  {
    title: "Monthly",
    type: DASHBOARD_TAB_TYPE.MONTHLY
  },
  {
    title: "Yearly",
    type: DASHBOARD_TAB_TYPE.FINANCIAL_YEAR

  }
]
export const getCurrentFY = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0–11
  return month >= 3 ? year : year - 1; // April = 3
};

export const AREA_CHART_STYLING = {
  fill: true,

  // Smooth curve
  tension: 0.4,

  // Line
  borderColor: "#6C5CE7",
  borderWidth: 3,

  // Gradient area
  backgroundColor: (context) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;

    if (!chartArea) return "rgba(108, 92, 231, 0.15)";

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );

    gradient.addColorStop(0, "rgba(108, 92, 231, 0.28)");
    gradient.addColorStop(0.6, "rgba(108, 92, 231, 0.08)");
    gradient.addColorStop(1, "rgba(108, 92, 231, 0)");

    return gradient;
  },

  // Small clean points
  pointRadius: 3,
  pointHoverRadius: 6,
  pointBackgroundColor: "#ffffff",
  pointBorderColor: "#6C5CE7",
  pointBorderWidth: 2,

  // Don't draw outside chart
  clip: false,
}




export const CARD_CONTENT = [
  {
    title: "Total Sales",
    valueKey: "sales",
    key: DASHBOARD_CARD_KEYS.SALES,
    icon: TrendingUpRoundedIcon,
    iconColor: "#7C3AED",
    iconBGColor: "#F3EEFF",
    needFormating: true,
    nestedkey: "",
    showGrowthIcon: true,
    spanText: "vs previous",
    bgColor: "linear-gradient(135deg, #FCFAFF 0%, #F1EBFF 100%)",
    showDataFor: [COMPANY_TYPE.ASHOK, COMPANY_TYPE.PADMA],
    growthKey: "growth.sales"

  },
  {
    title: "Received",
    valueKey: "payment",
    key: DASHBOARD_CARD_KEYS.RECEIVED,
    icon: AccountBalanceWalletOutlinedIcon,
    iconColor: "#22C55E",
    iconBGColor: "#ECFDF3",
    needFormating: true,
    nestedKey: "paid",
    growthKey: "",
    spanText: "of total sales",
    showGrowthIcon: false,
    bgColor: "linear-gradient(135deg, #F9FEFB 0%, #E8F9EE 100%)",
    showDataFor: [COMPANY_TYPE.ASHOK, COMPANY_TYPE.PADMA]

  },
  {
    title: "Outstanding",
    valueKey: "payment",
    key: DASHBOARD_CARD_KEYS.OUTSTANDING,
    icon: DescriptionOutlinedIcon,
    iconColor: "#F97316",
    iconBGColor: "#FFF1E6",
    needFormating: true,
    nestedKey: "unpaid",
    growthKey: "",
    spanText: "of total sales",
    showGrowthIcon: false,
    bgColor: "linear-gradient(135deg, #FFFBF8 0%, #FFEEE2 100%)",
    showDataFor: [COMPANY_TYPE.ASHOK, COMPANY_TYPE.PADMA]
  },
  {
    title: "Total Tons",
    valueKey: "tons",
    key: DASHBOARD_CARD_KEYS.GROWTH,
    icon: BarChartOutlinedIcon,
    iconColor: "#FF1493",
    iconBGColor: "#FFE5F3",
    needFormating: false,
    nestedKey: "",
    spanText: "vs previous",
    growthKey: "growth.tons",
    showGrowthIcon: true,
    bgColor: "linear-gradient(135deg, #FFF5FA 0%, #FFD6EC 100%)",
    showDataFor: [COMPANY_TYPE.ASHOK]
  }

]

export const TABLE_STYLE = {
  py: 1,
  px: 1.2,
  fontSize: "11px",
  fontWeight: 800,
  color: "#0F172A",
  textTransform: "uppercase",
  letterSpacing: "0.3px",

  backgroundColor: "#FAFBFC",
  borderBottom: "1px solid #E2E8F0",

  position: "sticky",
  top: 0,
  zIndex: 2,
};
export const TABLE_CELL_STYLE = {
  px: 1.2,
  py: 1.1,
  fontSize: "12px",
  color: "#334155",

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  borderBottom: "1px solid #F1F5F9",
};
