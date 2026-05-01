import React, { useMemo, useRef, useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate, useParams } from 'react-router-dom';
import CompanyTabs from '../../components/company-tabs';
import SelectVendor from '../../components/select-vendor';
import StatusFilter from '../../components/status-filter';
import { COMPANY_TYPE, FILTER_OPTION, STATUS_FILTER } from '../../constants/app-constant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Chip,IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import CollapsibleItem from './collpasible-item';
import TableSkeleton from './table-skeleton';
import Swal from 'sweetalert2';
import RollerFilter from '../../components/roller-filter';
import { getPOProgress, TABLE_COLUMNS } from './selector';
import PoTypeFilter from '../../components/potype-filter';


const PurchaseOrder = ({
    config,
    purchaseOrder,
    deletePoConnect,
    getInvoiceListConnect,
    getPoListConnect
}) => {

    const detailRef = useRef(null);
    const { company } = useParams();
    const Navigate = useNavigate();
    const { vendorsList = [] } = config;
    const { data = [] } = purchaseOrder;
    const filteredVendorList = vendorsList.filter((v => v.type === company));
    const [isLoading, setIsLoading] = useState(false)

    const [filters, setFilters] = useState({
        company
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const [poType, setPoType] = useState(FILTER_OPTION[1])
    const [openRow, setOpenRow] = React.useState(null);


    React.useEffect(() => {
        setIsLoading(true);
        getPoListConnect(filters)
        .then((_) => setIsLoading(false))
        .catch((_) => setIsLoading(false));
    }, [filters])

    React.useEffect(() => {
    if (openRow && detailRef.current) {
        setTimeout(() => {
        detailRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
        }, 200); // match Collapse timing
    }
    }, [openRow]);

    const handleToggle = (rowId) => {
        setOpenRow(prev => (prev === rowId ? null : rowId));
    };

    const handleChange = (event, newValue) => {
        const updatedFilters = {...filters};
        if (updatedFilters.size) delete updatedFilters.size;
        setFilters({
            ...updatedFilters,
            company: newValue,
        });
        Navigate(`/purchase-order/${newValue}`);
        // setValue(newValue);
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

    const selectVendorCallback = (event, selectedVendor) => {
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

    const onChangeStatusFilter = (selectedStatus) => {
        const { target: { value } } = selectedStatus;
        let updatedFilters = { ...filters };
        if (value === "ALL") {
            delete updatedFilters.poStatus;
        } else {
            updatedFilters.poStatus = value;
        }
        setFilters(updatedFilters);
    };

    const onChangeRollerSizeFilter = (selectedSize) => {
        const { target: { value } } = selectedSize;
        let updatedFilters = { ...filters };
        updatedFilters.size = value;
        setFilters(updatedFilters);
    };

    const onClear = () => {
        let updatedFilters = { ...filters };
        delete updatedFilters.size;
        setFilters(updatedFilters)
    }

    const deletePo = async(id) => {
        Swal.fire({
                title: "Are you sure?",
                text: "Do you want to delete this PO?",
                icon: "question",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                deletePoConnect(id)
                    .then(async() => {
                        Swal.fire(({
                            title: "Succesfully Deleted",
                            icon: "success"
                        }));
                        await getPoListConnect(filters);
                    })
                }



            })
    }

    // const columns = useMemo(() => getColumns({ company, vendorsList, expandedRow, toggleRow}), [company, vendorsList, expandedRow, toggleRow]);

    const renderContent = () => {

        return (
            <>
                <TableContainer >
                    <Table aria-label="collapsible table" >
                        <TableHead>
                            <TableRow>
                                {TABLE_COLUMNS.map((col, i) => (
                                <TableCell key={i}>
                                    <strong>{col.label}</strong>
                                </TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                        <TableBody>
                            {data.map((row, idx) => {
                                const helpers = {
                                    openRow,
                                    handleToggle,
                                    vendorsList,
                                    filteredVendorList,
                                    company,
                                    getPOProgress
                                };

                                return (
                                    isLoading ?
                                    <TableSkeleton />
                                    :
                                    <React.Fragment key={row._id}>
                                        <TableRow>
                                        {
                                            TABLE_COLUMNS.map((col, i) => {
                                                if (col.hide && col.hide(row)) return null;
                                                return (
                                                <TableCell key={i} sx={col.sx}>
                                                    {col.render(row, idx, helpers)}
                                                </TableCell>
                                                );
                                        }   )}
                                        </TableRow>

                                        <CollapsibleItem
                                            data={row}
                                            isOpen={openRow === row._id}
                                            detailRef={detailRef}
                                            deletePoHandler={deletePo}
                                            getInvoiceListConnect={getInvoiceListConnect}
                                            />
                                    </React.Fragment>
                                );
                            })}
                            </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    return (
        <div>
            <div className="mt-2">
                <h2 className="fw-bold">Purchase Order</h2>
                <Box sx={{
                    mt: 2,
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: {
                        xs: "column",
                        sm: "row"
                    },
                    gap: 2
                }}>
                <Box width="100%">
                    <input type="file" onChange={upload} />
                    {company === COMPANY_TYPE.ASHOK && (
                        <PoTypeFilter
                        options={FILTER_OPTION}
                        selected={poType}
                        onChange={onPoTypeFilterClick}
                        />
                    )}
                </Box>

                    <Box sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection:{
                                xs: "column",
                                sm: "row"
                            },
                            width: {
                                xs: "100%",
                                sm: "auto"
                            }
                        }}
                    >
                        {
                            ((company === COMPANY_TYPE.ASHOK && poType.id === FILTER_OPTION[2].id)
                            ||
                            (company === COMPANY_TYPE.PADMA)) &&
                            <RollerFilter
                                onClear={onClear}
                                value={filters?.size || ""}
                                onChange={onChangeRollerSizeFilter}
                            />
                        }

                        {
                            company === COMPANY_TYPE.PADMA &&
                            <SelectVendor
                                size={"small"}
                                callback={(event,selectedVendor) => selectVendorCallback(event,selectedVendor)}
                            />
                        }

                        <StatusFilter
                            size={"small"}
                            defaultStatus={STATUS_FILTER[1]}
                            options={STATUS_FILTER}
                            onchange={onChangeStatusFilter}
                        />

                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    <CompanyTabs
                        value={company}
                        onChange={handleChange}
                        renderContent={renderContent}
                    />
                </Box>
            </div>
        </div>
    )
}

export default PurchaseOrder