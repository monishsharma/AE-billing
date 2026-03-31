    export const deductPercent = (value, percent = 1.25) => (value - (value * percent) / 100);


    export const preSelectItems = ({ items, poData }) => {
        const mapped = {};
        poData.forEach((po, poIndex) => {
            (po.items || []).map((poItem, poItemIndex) => {
                const selectedItem = items.find((item, itemIndex) => {
                    const isSamePo = String(item.poNumber || "") === String(po.poNumber || "");
                    const isSameItemId = item.itemId && poItem.itemId && String(item.itemId) === String(poItem.itemId);
                    return isSamePo && isSameItemId;
                })
                if (selectedItem) {
                    mapped[`${poItem.itemId}`] = {
                        ...poItem,
                        poNumber: po.poNumber,
                        dispatchQty: selectedItem.qty,
                        bdsRate: deductPercent(poItem.rate)
                    };
                }
            })
        })
        return mapped;
    }