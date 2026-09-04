import { COMPANY_TYPE } from "../../constants/app-constant";

export const getBreakdownData = ({
    company,
    data,
    apiDataKey,
}) => {
    if (company === COMPANY_TYPE.ASHOK) {
        const breakdown = Object.entries(
            data?.itemBreakdown?.[apiDataKey] || {}
        ).reduce((acc, [category, item]) => {
            const normalizedCategory = category?.trim().toLowerCase();

            const label =
                !normalizedCategory ||
                    ["other", "others"].includes(normalizedCategory)
                    ? "Uncategorized"
                    : category.trim();

            if (!acc[label]) {
                acc[label] = {
                    value: 0,
                    qty: 0,
                };
            }

            acc[label].value += Number(item?.total || 0);
            acc[label].qty += Number(item?.qty || 0);

            return acc;
        }, {});

        return Object.entries(breakdown).map(
            ([label, item]) => ({
                label,
                value: item.value,
                qty: item.qty,
            })
        );
    }

    return Object.entries(
        data?.customerBreakdown?.[apiDataKey] || {}
    ).map(([customer, value]) => ({
        label: customer,
        value: Number(value || 0),
    }));
};


export const getFinancialYear = (selectedDate) => {
    const fyStartYear = selectedDate.getMonth() >= 3 ? selectedDate.getFullYear() : selectedDate.getFullYear() - 1;
    const fyEndYear = String(fyStartYear + 1).slice(-2);
    const fy = `${fyStartYear}-${fyEndYear}`;
    return { fy, fyStartYear, fyEndYear}
}