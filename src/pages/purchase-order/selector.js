export const PO_TYPES = ["FRAME", "ROLLER", "BAKELITE"]
export const FILTER_OPTION = [
    {
        label: "ALL",
        id: 1
    },
    {
        label: "FRAME",
        id: 2
    },
    {
        label: "ROLLER",
        id: 3
    },
    {
        label: "BAKELITE",
        id: 4
    },
    {
        label: "OTHERS",
        id: 5
    }
];
export const STATUS_FILTER = [
    {
        label: "All",
        value: "ALL",
        id: 1,
        color: "#1a237e"
    },
    {
        label: "Pending",
        value: "PENDING",
        id: 2,
        color: "#ED6C02"
    },
    {
        label: "Completed",
        value: "COMPLETED",
        id: 3,
        color: "#4caf50"
    },

];


export const TABLE_HEAD = [
    {
        value: ""
    },
    {
        value: "Sno"
    },
    {
        value: "PO Number"
    },

    {
        value: "Customer"
    },
    {
        value: "PO Date"
    },
    {
        value: "Status"
    },
    {
        value: "Progress"
    }
]

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