import {
    Box,
    Button,
    Chip,
    Modal,
    Tab,
    Typography
} from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageLoader from "../page-loader"
import { COMPANY_TYPE } from '../../constants/app-constant';
import PoTable from './poTable';
import { deductPercent, preSelectItems } from './selector';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column'
};

const PoSelection = ({
    open,
    items,
    onSave,
    company,
    orderType,
    customer,
    preselectedItems = [],
    selectedPoNumbers = [],
    purchaseOrder,
    toggleModal,
    invoiceId,
    originalItems = [],
    getPoListConnect,
    getInvoiceListConnect
}) => {
    const { data = [] } = purchaseOrder || {};
    const isCompanyAshok = company === COMPANY_TYPE.ASHOK;
    const [selectedPo, setSelectedPo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});

    useEffect(() => {
      if (items.length && data.length) {
        setSelectedItems(preSelectItems({items, poData: data}))
      }
    }, [items.length, data.length])



    useEffect(() => {
        setIsFetching(true)
        getPoListConnect({
            company,
            ...(orderType && {
                poType: orderType.toUpperCase()
            }),
            ...(customer && !isCompanyAshok && {
                vendorId: customer
            })
        })
        .then((_) => setIsFetching(false))
        .catch((_) => setIsFetching(false))
    }, []);

    // useEffect(() => {
    //     if (!open || !data.length) return;
    //     setSelectedItems(
    //         mapPreselectedItems(data, preselectedItems, originalItems, selectedPoNumbers)
    //     );
    // }, [open, data, preselectedItems, originalItems, selectedPoNumbers]);

     const handleChange = (_, newValue) => {
        setSelectedPo(newValue);
    };


    const handleSelectItem = (item) => {
        const key = item.itemId;

        setSelectedItems(prev => {
            const updated = { ...prev };

            if (updated[key]) {
            delete updated[key];
            } else {
            const existingQty = items.find(i => i.itemId === key)?.qty;

            updated[key] = {
                ...item,
                poNumber: item.poNumber,
                dispatchQty: existingQty || item.pendingQty || 0,
                bdsRate: deductPercent(item.rate)
            };
            }

            return updated;
        });
    };

    const handleQtyChange = ({ key, value }) => {
        setSelectedItems(prev => {
            const updated = { ...prev };

            if (!updated[key]) return prev;

            updated[key] = {
                ...updated[key],
                dispatchQty: value,
            };

            return updated;
        });
    };

    const getSelectedCountByPo = (poIndex) => {
        const poNumber = data[poIndex]?.poNumber;

        return Object.values(selectedItems).filter(
            item => item.poNumber === poNumber
        ).length;
    };

    const totalSelected = useMemo(
        () => Object.keys(selectedItems).length,
        [selectedItems]
    );

    const totalDispatchQty = useMemo(
        () =>
            Object.values(selectedItems).reduce(
                (sum, item) => sum + (item.dispatchQty || 0),
                0
            ),
        [selectedItems]
    );

    const hasValidSelection = useMemo(
        () => Object.values(selectedItems).some(item => Number(item.dispatchQty) > 0),
        [selectedItems]
    );

    const handleSave = () => {
        const finalItems = Object.values(selectedItems).filter(
            item => item.dispatchQty > 0
        );
        onSave(finalItems);
        toggleModal();
    };

    if (isFetching) return <PageLoader />

    return (
        <Modal open={open} onClose={toggleModal}>
            <Box sx={style}>

                {/* HEADER */}
                <Box
                    px={3}
                    pt={2}
                    pb={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5">Select Po</Typography>
                    <CloseOutlinedIcon
                        onClick={toggleModal}
                        sx={{ cursor: 'pointer' }}
                    />
                </Box>

                <TabContext value={selectedPo}>

                    {/* MAIN FLEX AREA */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            minHeight: 0
                        }}
                    >

                        {/* TABS */}
                        <Box px={3}>
                            <TabList
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                {data.map((item, index) => (
                                    <Tab
                                        key={index}
                                        value={index}
                                        label={
                                            <Box display="flex" gap={1} alignItems="center">
                                                <span>{item.poNumber}</span>

                                                {getSelectedCountByPo(index) > 0 && (
                                                <Chip
                                                    label={getSelectedCountByPo(index)}
                                                    size="small"
                                                    color="primary"
                                                />
                                            )}
                                            </Box>
                                        }
                                    />
                                ))}
                            </TabList>
                        </Box>

                        {/* SCROLLABLE TABLE AREA */}
                        <TabPanel
                            value={selectedPo}
                            sx={{
                                flex: 1,
                                overflow: 'auto',
                                minHeight: 0,
                                px: 3,
                                pb: 2,
                                pt: 0
                            }}
                        >
                            <PoTable
                                data={data}
                                isCompanyAshok={isCompanyAshok}
                                selectedPo={selectedPo}
                                items={items}
                                selectedItems={selectedItems}
                                handleSelectItem={handleSelectItem}
                                handleQtyChange={handleQtyChange}
                                invoiceId={invoiceId}
                                getInvoiceListConnect={getInvoiceListConnect}
                            />
                        </TabPanel>

                    </Box>
                </TabContext>
                <Box
                    px={3}
                    py={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderTop="1px solid #eee"
                >
                    <Typography>
                        Selected: {totalSelected} | Total Dispatch Qty: {totalDispatchQty}
                    </Typography>

                    <Box display="flex" gap={2}>
                        <Button variant="outlined" onClick={toggleModal}>
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={!hasValidSelection}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default PoSelection;