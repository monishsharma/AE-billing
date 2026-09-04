import { DASHBOARD_TAB_TYPE } from "../../constants/app-constant";

export const getAreaChartOption = (reportType, dateValue) => {

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short"
  });

  const month = new Date(dateValue).getMonth();

  const currentYear = new Date().getFullYear();

  const selectedYear = new Date(dateValue).getFullYear();

  const isMonthInCurrentFY = month >= 3 ? true : false;

  const isCurrentPeriod = selectedYear === currentYear && isMonthInCurrentFY;

  return ({
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: false,
        text: "Sales Trend"
      },

      tooltip: {
        backgroundColor: "#6C5CE7",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
        cornerRadius: 10,
        displayColors: false,

        callbacks: {
          label: (context) => {
            return `₹ ${context.raw.toLocaleString("en-IN")}`;
          },
        },
      },
    },

    scales: {
      x: {
        border: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          // color: "#000",
          color: (context) =>
          context.tick.label === currentMonth  && isCurrentPeriod
            ? "#6C5CE7"
            : "#94A3B8",

          font: {
            size: 12,
            weight: (context) => context.tick.label === currentMonth && isCurrentPeriod ? 700 : 500
          },
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color: "rgba(0,0,0,0.05)",
          drawTicks: false,
        },

        ticks: {
          color: "#000",
          padding: 12,
          stepSize: reportType === DASHBOARD_TAB_TYPE.MONTHLY ? 1000000 : 10000000,

          callback: (value) => {
            if (value >= 10000000) {
              return `₹${(value / 10000000).toFixed(1)}Cr`;
            }

            if (value >= 100000) {
              return `₹${(value / 100000).toFixed(0)}L`;
            }

            return `₹${value}`;
          },
        },
      },
    },
  })
};