import { DASHBOARD_CARD_KEYS } from "../constants/app-constant";

export const calculateBusinessGrowth = ({data: reportStat, apiDataKey, cardKey}) => {
  const sales = reportStat?.sales?.[apiDataKey] || 0;
  const paid = reportStat?.payment?.[apiDataKey]?.paid || 0;
  const unpaid = reportStat?.payment?.[apiDataKey]?.unpaid || 0;

  const paidPercentage = sales
    ? ((paid / sales) * 100).toFixed(1)
    : "0.0";

  const unpaidPercentage = sales
    ? ((unpaid / sales) * 100).toFixed(1)
    : "0.0";

  const salesGrowth =
    reportStat?.growth?.sales?.[apiDataKey] || {
      hasGrow: false,
      growthPercentage: "0.0",
    };

  const tonsGrowth =
    reportStat?.growth?.tons?.[apiDataKey] || {
      hasGrow: false,
      growthPercentage: "0.0",
    };

    if (cardKey === DASHBOARD_CARD_KEYS.SALES) {
        return {
            hasGrow: salesGrowth.hasGrow,
            color: salesGrowth.hasGrow  ? "#22C55E" : "#EF4444",
            growthPercentage: salesGrowth.growthPercentage,
        }
    }

    if (cardKey === DASHBOARD_CARD_KEYS.RECEIVED) {
        return {
            hasGrow: salesGrowth.hasGrow,
            color: paid == 0 ? "#EF4444" : "#22C55E",
            growthPercentage: paidPercentage,
        }
    }

    if (cardKey === DASHBOARD_CARD_KEYS.OUTSTANDING) {
        return {
            hasGrow: false,
            color: unpaid == 0 ? "#EF4444" : "#F97316",
            growthPercentage: unpaidPercentage,
        }
    }

    if (cardKey === DASHBOARD_CARD_KEYS.GROWTH) {
        return {
            hasGrow: tonsGrowth.hasGrow,
            color: tonsGrowth.hasGrow  ? "#22C55E" : "#EF4444",
            growthPercentage: tonsGrowth.growthPercentage,
        }
    }

};