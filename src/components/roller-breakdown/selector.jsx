export const FINANCIAL_YEAR_MONTHS = [
    {
        label: "Apr",
        key: "04"
    },
    {
        label: "May",
        key: "05"
    },
    {
        label: "Jun",
        key: "06"
    },
    {
        label: "Jul",
        key: "07"
    },
    {
        label: "Aug",
        key: "08"
    },
    {
        label: "Sep",
        key: "09"
    },
    {
        label: "Oct",
        key: "10"
    },
    {
        label: "Nov",
        key: "11"
    },
    {
        label: "Dec",
        key: "12"
    },
    {
        label: "Jan",
        key: "01"
    },
    {
        label: "Feb",
        key: "02"
    },
    {
        label: "Mar",
        key: "03"
    },
]

export const getFinancialYearMonthsTill = (month) => {
  const index = FINANCIAL_YEAR_MONTHS.findIndex(
    (item) => item.key === String(month).padStart(2, "0")
  );

  return FINANCIAL_YEAR_MONTHS.slice(0, index + 1);
};