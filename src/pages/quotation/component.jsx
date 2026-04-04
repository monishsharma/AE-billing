import React, { useMemo, useState, useCallback } from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import CompanyTabs from '../../components/company-tabs';
import { DataGrid } from '@mui/x-data-grid';
import { getColumns } from './selector';
import { toast, Bounce } from "react-toastify";
import Swal from 'sweetalert2';
import { getNextInvoiceNo } from '../../helpers/get-invoice-no';
import SelectVendor from '../../components/select-vendor';
import { COMPANY_TYPE, FILTER_OPTION } from '../../constants/app-constant';
import { ButtonGroup } from '@mui/material';
import PoTypeFilter from '../../components/potype-filter';

const Quotation = ({
    getConfigConnect,
    getQuotationConnect,
    saveQuotationConnect,
    resetReducerConnect,
    getQuotationPdfConnect
}) => {

    const Navigate = useNavigate();
    const { company } = useParams();
    const [quotationList, setQuotationList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [poType, setPoType] = useState(FILTER_OPTION[0])
    const [filters, setFilters] = useState({
        company
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const showToast = React.useCallback(({ type, text, ...rest }) =>
            toast[type](text, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                ...rest,
        }), []);

    React.useEffect(() => {
        setIsLoading(true);
        setQuotationList([])
        getQuotationConnect(filters)
        .then((res) => {
            setQuotationList(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false);
        })
    }, [filters])

    const handleChange = (event, newValue) => {
        setFilters({
            ...filters,
            company: newValue
        })
        Navigate(`/quotation/${newValue}`);
        // setValue(newValue);
    };

    const onClick = () => {
        resetReducerConnect();
        Navigate("/new/quotation");
    };

    const onPoTypeFilterClick = (selectedFilter) => {
        setPoType(selectedFilter);
        setFilters(prev => {
            const updated = { ...prev };

            if (selectedFilter.id === 1) {
                delete updated.poType;
            } else {
                updated.poType = selectedFilter.label;
            }

            return updated;
        });
    };

    const handleRowClick = ({row}) => {
        resetReducerConnect();
        Navigate(`/edit/quotation/${row._id}`);
    }

    const downloadQuotation = useCallback(async(e,row) => {

        const payload = {
            id: row._id,
        };

        let toastId = new Date().getTime();

        showToast({
            type: "info",
            text: "Preparing download...",
            autoClose: false,
            closeButton: false,
            progress: 0,
            theme: "dark",
            toastId: toastId,
        });

        try {
            //   setIsLoading(true);
            const pdfResponse = await getQuotationPdfConnect(payload, {
                responseType: "blob",
                headers: {
                    Accept: "application/pdf",
                },
                onDownloadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        // Show or update the toast
                        if (!toastId) {
                            toastId = toast.info(`Downloading... ${percent}%`, {
                                progress: percent / 100,
                                autoClose: false,
                                closeButton: false,
                                theme: "dark",
                                transition: Bounce,
                                toastId: toastId, // consistent ID to update the same toast
                            });
                        } else {
                            toast.update("download-toast", {
                                render: `Downloading... ${percent}%`,
                                progress: percent / 100,
                                theme: "dark",
                                transition: Bounce,
                            });
                        }
                    }
                },
            });

            const contentDisposition = pdfResponse.headers["content-disposition"];
            const match = contentDisposition?.match(/filename="?(.+)"?/);
            const filename = match?.[1] || "Quotation.pdf";

            const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = fileURL;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            //   setIsLoading(false);
            toast.update(toastId, {
                render: "Download complete!",
                type: "success",
                autoClose: 2000,
                progress: undefined,
            });
        } catch (pdfErr) {
            console.error("PDF generation error", pdfErr);
            Swal.fire({
                icon: "error",
                text: "Failed to generate PDF",
            });
            setIsLoading(false);
        }
    }, [getQuotationPdfConnect, showToast]);

    const makeQuotationCopy = (e,row) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to create a copy of this quotation?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {

            console.log(row)
            if (result.isConfirmed) {
              setIsLoading(true);
                // Call API to copy quotation
                getConfigConnect()
                      .then(async(res) => {
                        const {config: {quotation} = {}} = res;
                        const payload = {...row}
                        delete payload._id;
                        const nextQuotationeNo = getNextInvoiceNo(quotation[company], "nextQuotationNo");
                        payload.quotationDetail.quotationNo = nextQuotationeNo;
                        payload.quotationDetail.quotationDate = new Date().toISOString().split('T')[0];
                        payload.quotationDate = new Date();
                        await saveQuotationConnect(payload);
                        fetchQuotationList();
                        setIsLoading(false);
                      })
                      .catch(() => {
                        setIsLoading(false);
                      })
                // On success:
                showToast({
                    type: "success",
                    text: "Quotation copied successfully!",
                });
                // Optionally, refresh the quotation list or navigate to the new quotation
            }
        });
    }

    const selectVendorCallback = (selectedVendor) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (!selectedVendor) {
                delete updated.vendorId;
            } else {
                updated.vendorId = selectedVendor.id;
            }

            return updated;
        })
    }

    const columns = useMemo(() => getColumns({  company, handleDownload: downloadQuotation, makeQuotationCopy }), [ company, downloadQuotation]);


    const renderContent = () => {
        return (
                <Box sx={{ height: 470, width: '100%' }}>
                    <DataGrid
                    rows={isLoading ? [] : quotationList}
                    getRowId={(row) => row._id}

                    columns={columns}
                    disableColumnMenu={true}
                    onRowClick={handleRowClick}
                    loading={isLoading}
                    disableRowSelectionOnClick
                    disableColumnResize
                    sx={{
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus-within': {
                        outline: 'none !important',
                        },
                        cursor: 'pointer',
                    }}
                    initialState={
                        {
                            pagination: {
                                paginationModel,
                            },
                        }
                    }
                    // showToolbar
                />
            </Box>
        )
    }

    return (
        <div>
            <div className="mt-2">
                <h2 className="fw-bold">Quotation</h2>
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        },
                    }}
                >
                    <Button
                        onClick={onClick}
                        variant="contained"
                        className="customBtn"
                        size="medium"
                        startIcon={<AddIcon />}
                        sx={{
                            textTransform: "none",
                            minWidth: "120px",
                            width: {
                                xs: "100%",
                                sm: "auto",
                            }
                        }}
                    >
                        New Quotation
                    </Button>
                    <Box mt={2} mb={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                         {company === COMPANY_TYPE.ASHOK && (
                            <PoTypeFilter
                            options={FILTER_OPTION}
                            selected={poType}
                            onChange={onPoTypeFilterClick}
                            />
                        )}
                    </Box>
                </Box>
                    {
                        company === COMPANY_TYPE.PADMA &&
                        <SelectVendor
                            size={"small"}
                            width={250}
                            callback={(selectedVendor) => selectVendorCallback(selectedVendor)}
                        />
                    }
                </Box>
            </div>
           <div className="mt-2">
             <CompanyTabs
                value={company}
                onChange={handleChange}
                renderContent={renderContent}
            />
           </div>
        </div>
    )
}

export default Quotation