import React, { useMemo, useRef, useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate, useParams } from 'react-router-dom';
import CompanyTabs from '../../components/company-tabs';
import SelectVendor from '../../components/select-vendor';
import { FILTER_OPTION, getPOProgress, STATUS_FILTER, TABLE_HEAD } from './selector';
import StatusFilter from '../../components/status-filter';
import { COMPANY_TYPE } from '../../constants/app-constant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Chip,IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import CollapsibleItem from './collpasible-item';
import TableSkeleton from './table-skeleton';


const PurchaseOrder = ({
    config,
    purchaseOrder,
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
        company,
        poStatus: STATUS_FILTER[1].value
    });
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });
    const [poType, setPoType] = useState(FILTER_OPTION[0])
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
        setFilters({
            ...filters,
            company: newValue
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

    const onChangeStatusFilter = (selectedStatus) => {
        const { target: { value } } = selectedStatus;
        let updatedFilters = { ...filters };
        if (value === "ALL") {
            delete updatedFilters.poStatus;
        } else {
            updatedFilters.poStatus = value;
        }
        setFilters(updatedFilters);
    }

    // const columns = useMemo(() => getColumns({ company, vendorsList, expandedRow, toggleRow}), [company, vendorsList, expandedRow, toggleRow]);

    const renderContent = () => {

        return (
            <>
                <TableContainer >
                    <Table aria-label="collapsible table" >
                        <TableHead>
                            <TableRow>
                                {/* <TableCell width={1}></TableCell> */}
                                {
                                    TABLE_HEAD.map((head, index) => (
                                        <TableCell key={index}><strong>{head.value}</strong></TableCell>
                                    ))
                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ? <TableSkeleton /> : data.map((data, idx) => {
                                    const isPoForFrame = data.poType === "FRAME";
                                    const isOpen = openRow === data._id;
                                    const isPending = data?.poStatus === "PENDING";
                                    const index = vendorsList.findIndex(vendor => vendor.id === data.vendorId);
                                    return (
                                        <>
                                            <TableRow key={idx}>
                                                <TableCell width={10}>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => handleToggle(data._id)}
                                                    >
                                                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{data.poNumber}</TableCell>
                                                <TableCell>
                                                    {
                                                        company === "ASHOK" ?
                                                        filteredVendorList[0]?.label
                                                        :
                                                        vendorsList[index]?.label
                                                    }
                                                </TableCell>
                                                <TableCell>{moment(data.poDate).format("ll")}</TableCell>
                                                <TableCell>
                                                    <div className="status-cell">
                                                        <Chip
                                                            label={isPending ? "Pending" : "Completed"}
                                                            size="small"
                                                            sx={{
                                                                border: `1px solid ${isPending ? "#ED6C02" : "#4caf50"}`,
                                                                background: isPending ? "#ED6C02" : "#4caf50",
                                                                color: "white"
                                                            }}
                                                            className="status-chip"
                                                        />
                                                    </div>
                                                </TableCell>
                                                {!isPoForFrame && <TableCell width={220}>
                                                    {(() => {
                                                        const { percent, isComplete, totalQty, totalDispatched } = getPOProgress(data);

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
                                                    })()}
                                                </TableCell>}
                                            </TableRow>
                                            <CollapsibleItem
                                                data={data}
                                                isOpen={isOpen}
                                                detailRef={detailRef}
                                            />
                                        </>

                                    )
                                })
                            }
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
                <Box mt={2} mb={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        {
                            company === COMPANY_TYPE.ASHOK &&
                            <ButtonGroup variant="outlined" aria-label="Basic button group" >
                                {
                                    FILTER_OPTION.map((option) => (
                                        <Button
                                            className={poType.id === option.id ? "customBtn" : "outlinedCustomBtn"}
                                            key={option.id}
                                            onClick={() => onPoTypeFilterClick(option)}
                                        >
                                            {option.label}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                        }
                    </Box>

                    <Box display={"flex"} gap={2} alignContent={"flex-end"}>
                        {
                            company === COMPANY_TYPE.PADMA &&
                            <SelectVendor
                                size={"small"}
                                callback={(selectedVendor) => selectVendorCallback(selectedVendor)}
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