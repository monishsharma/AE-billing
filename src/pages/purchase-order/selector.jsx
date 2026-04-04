import { Box, Chip, IconButton, LinearProgress, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export const TABLE_COLUMNS = [
  {
    label: "",
    render: (row, idx, helpers) => (
      <IconButton
        size="small"
        onClick={() => helpers.handleToggle(row._id)}
      >
        {helpers.openRow === row._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    )
  },
  {
    label: "Sno",
    render: (_, idx) => idx + 1
  },
  {
    label: "PO Number",
    sx: { whiteSpace: "nowrap" },
    render: (row) => row.poNumber
  },
  {
    label: "Customer",
    sx: { minWidth: 175 },
    render: (row, _, helpers) => {
      const index = helpers.vendorsList.findIndex(v => v.id === row.vendorId);
      return helpers.company === "ASHOK"
        ? helpers.filteredVendorList[0]?.label
        : helpers.vendorsList[index]?.label;
    }
  },
  {
    label: "PO Type",
    sx: { minWidth: 100 },
    render: (row) => row.poType
  },
  {
    label: "Status",
    render: (row) => {
      const isPending = row?.poStatus === "PENDING";
      return (
        <Chip
          label={isPending ? "Pending" : "Completed"}
          size="small"
          sx={{
            border: `1px solid ${isPending ? "#ED6C02" : "#4caf50"}`,
            background: isPending ? "#ED6C02" : "#4caf50",
            color: "white"
          }}
        />
      );
    }
  },
  {
    label: "Progress",
    sx: { minWidth: 220 },
    hide: (row) => row.poType === "FRAME",
    render: (row, _, helpers) => {
      const { percent, isComplete, totalQty, totalDispatched } = helpers.getPOProgress(row);

      return (
        <Box>
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              height: 6,
              borderRadius: 5,
              backgroundColor: "#eee",
              "& .MuiLinearProgress-bar": {
                backgroundColor: isComplete ? "#4caf50" : "#ED6C02",
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography variant="caption">
              {totalDispatched} / {totalQty}
            </Typography>
            <Typography variant="caption">
              {Math.round(percent)}%
            </Typography>
          </Box>
        </Box>
      );
    }
  }
];

export const getPOProgress = (po) => {
  let totalQty = 0;
  let totalDispatched = 0;

  po.items.forEach(item => {
    totalQty += Number(item.qty || 0);
    totalDispatched += Number(item.dispatchedQty || 0);
  });

  if (!totalQty) return { percent: 0, isComplete: false };

  const percent = (totalDispatched / totalQty) * 100;

  return {
    percent,
    isComplete: percent >= 100,
    totalQty,
    totalDispatched
  };
};

export const calculateDispatchedItemQty = ({ poItems = [], dispatchedItems = [] }) => {

  const dispatchedMap = dispatchedItems.reduce((acc, item) => {
    const key = item.itemId;
    if (!key) return acc;

    acc[key] = (acc[key] || 0) + Number(item.qty || 0);
    return acc;
  }, {});

  return poItems.reduce((sum, item) => {
    const dispatchedQty = dispatchedMap[item.itemId] || 0;
    return sum + dispatchedQty;
  }, 0); // ✅ important
};


    // const totalDispatchQty = useMemo(
    //     () =>
    //         Object.values(selectedItems).reduce(
    //             (sum, item) => sum + (item.dispatchQty || 0),
    //             0
    //         ),
    //     [selectedItems]
    // );