export const columns = [
    {
        label: "S no",
    },
    {
        label: "Invoice No",
    },
    {
        label: "Description",
    },
    {
        label: "Billed To",
    },
    {
        label: "Date",
    },
    {
        label: "Status",
    },
    {
        label: "Amount",
    },
    {
        label: "Amount Paid",
    },
    {
        label: "Amount Due",
    },
]

export const columns1 = [
    {
        field: 'Invoice No',
        headerName: 'Invoice No',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        flex: 1,
        minWidth: 150,
        valueGetter: (value, row) => `${row.invoiceDetail.invoiceNO}`,
    },
    {
        field: 'Billed To',
        headerName: 'Billed To',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 2,
        minWidth: 200,
        valueGetter: (value, row) => `${row.buyerDetail.name}`,
    },
    {
        field: 'date',
        headerName: 'Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 120,
        valueGetter: (value, row) => `${moment(row.invoiceDetail.invoiceDate).format("DD-MM-YYYY")}`,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 120,
        renderCell: (value) => <Chip label={value.row.paid ? "Paid" : "Unpaid"} size="small" variant="Outlined" color={value.row.paid ? "primary" : "error"} />,
    },
    {
        field: 'Amount',
        headerName: 'Amount',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 120,
        valueGetter: (value, row) => `${parseFloat(row.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
        field: 'Bill',
        headerName: 'Bill',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 100,
        renderCell: (value) => (
            <>
                <IconButton onClick={(e) => handleDownload(e, value.row)} size="small">
                    <FileCopyIcon />
                </IconButton>
                <IconButton onClick={(e) => handleDownload(e, value.row, true)} size="small">
                    <DownloadIcon />
                </IconButton>
            </>
        )
    },
];