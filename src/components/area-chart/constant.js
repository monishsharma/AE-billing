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

export const getCurrentMonthRipplePlugin = (dateValue, reportType) => {
  const now = new Date();

  const currentMonth = now.toLocaleString("en-US", {
    month: "short",
  });

  const currentYear = now.getFullYear();
  const currentMonthNumber = now.getMonth();

  const selectedDate = new Date(dateValue);
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  // Current FY
  const fyStartYear =
    currentMonthNumber >= 3
      ? currentYear
      : currentYear - 1;

  const currentFY = `${fyStartYear}-${String(fyStartYear + 1).slice(-2)}`;

  const isMonthly = reportType?.toLowerCase() === "monthly";

  // Your original monthly check
  const isMonthInCurrentFY = selectedMonth >= 3;

  const isCurrentPeriod =
    selectedYear === currentYear &&
    isMonthInCurrentFY;

  const currentLabel = isMonthly
    ? currentMonth
    : currentFY;

  return {
    id: "currentMonthRipple",

    afterDatasetsDraw(chart) {
      // Only apply this check for monthly
      if (isMonthly && !isCurrentPeriod) return;

      const { ctx } = chart;

      const index = chart.data.labels?.indexOf(currentLabel);

      if (index === -1) return;

      const point = chart.getDatasetMeta(0)?.data?.[index];

      if (!point) return;

      const duration = 1600;
      const progress = (Date.now() % duration) / duration;

      const radius = 6 + progress * 12;
      const opacity = 0.5 * (1 - progress);

      ctx.save();

      ctx.beginPath();
      ctx.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      requestAnimationFrame(() => {
        chart.draw();
      });
    },
  };
};