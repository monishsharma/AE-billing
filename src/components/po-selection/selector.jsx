import { Checkbox, Chip, TextField } from "@mui/material";

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
                        dispatchQty: selectedItem.dispatchQty || selectedItem.qty,
                        bdsRate: deductPercent(poItem.rate)
                    };
                }
            })
        })
        return mapped;
    }


    const statusConfig = {
  Completed: {
    label: "Completed",
    sx: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32"
    }
  },
  Partial: {
    label: "Partial",
    sx: {
      backgroundColor: "#e3f2fd",
      color: "#1565c0"
    }
  },
  Pending: {
    label: "Pending",
    sx: {
      backgroundColor: "#fff3e0",
      color: "#e65100"
    }
  }
};


export const columns = ({ isCompanyAshok, isEditMode, getStatus }) => [
  {
    key: "checkbox",
    label: "",
    render: ({ poItem, selected, handleSelectItem, data, selectedPo }) => (
      <Checkbox
        checked={!!selected}
        disabled={poItem.pendingQty <= 0 && !selected}
        onChange={() =>
          handleSelectItem({
            ...poItem,
            poNumber: data[selectedPo].poNumber
          })
        }
      />
    )
  },
  {
    key: "sno",
    label: "Sno",
    align: "center",
    render: ({ poItem, index }) => poItem.itemNo || index + 1
  },
  {
    key: "description",
    label: "Description",
    render: ({ poItem }) => poItem.description,
    sx: { minWidth: 200 }
  },
  {
  key: "status",
  label: "Status",
  align: "center",
  render: ({ totalQty, remainingQty }) => {
  const status = getStatus(totalQty, remainingQty);
  const config = statusConfig[status];

  return (
    <Chip
      label={config?.label}
      size="small"
      sx={{
        width: 90,
        justifyContent: "center",
        fontWeight: 500,
        borderRadius: "6px",
        ...config?.sx
      }}
    />
  );
}
},
  {
    key: "workOrder",
    label: "Work Order",
    align: "center",
    render: ({ poItem }) => poItem.workOrder,

  },
  {
    key: "unit",
    label: "Unit",
    align: "center",
    render: ({ poItem }) => poItem.unit
  },
  {
    key: "rate",
    label: "Rate",
    align: "center",
    render: ({ poItem }) => poItem.rate
  },
  ...(isCompanyAshok
    ? [
        {
          key: "bds",
          label: "Rate (-BDS)",
          align: "center",
          render: ({ poItem }) => deductPercent(poItem.rate)
        }
      ]
    : []),
  {
    key: "totalQty",
    label: "Total Qty",
    align: "center",
    render: ({ poItem }) => Number(poItem.qty) || 0
  },
  {
    key: "available",
    label: isEditMode ? "Available" : "Pending",
    align: "center",
    render: ({ availableQty }) => availableQty
  },
  {
    key: "dispatch",
    label: "Dispatch",
    align: "center",
    render: ({ selected, dispatchQty, handleQtyChange, poItem }) =>
      selected ? (
        <TextField
          size="small"
          type="number"
          value={dispatchQty}
          sx={{ width: 60 }}
          variant="standard"
          onChange={(e) =>
            handleQtyChange({
              key: poItem.itemId,
              value: e.target.value || ""
            })
          }
        />
      ) : (
        "-"
      )
  },
  {
    key: "remaining",
    label: "Remaining",
    align: "center",
    render: ({ remainingQty }) => remainingQty,
    getSx: ({ remainingQty }) => ({
      color:
        remainingQty === 0
          ? "green"
          : remainingQty < 0
          ? "red"
          : "inherit"
    })
  }
];