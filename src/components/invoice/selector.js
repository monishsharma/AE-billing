export const columns = [
    {
        label: "S no",

    },
    {
        label: "Invoice No",

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
        label: "",
    }


]

export const columns1 = [
    {
        field: 'Invoice No',
        headerName: 'Invoice No',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        valueGetter: (value, row) => `${row.invoiceDetail.invoiceNO}`,

      },
      {
        field: 'Billed To',
        headerName: 'Billed To',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 350,
        valueGetter: (value, row) => `${row.buyerDetail.name}`,
      },
      {
        field: 'date',
        headerName: 'Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 100,
        valueGetter: (value, row) => `${row.invoiceDetail.invoiceDate}`,
      },
      {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },
      {
        field: 'Amount',
        headerName: 'Amount',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (value, row) => `${parseFloat(row.goodsDescription.Total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
  ];