import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import React from 'react';
import { deductPercent } from './selector';

const PoTable = ({
  data,
  invoiceId,
  selectedPo,
  selectedItems,
  isCompanyAshok,
  handleSelectItem,
  handleQtyChange,
  getInvoiceListConnect
}) => {

  const poItems = data?.[selectedPo]?.items || [];



  const isEditMode = Boolean(invoiceId); // 🔥 key condition

  const [invoiceQtyMap, setInvoiceQtyMap] = React.useState({});

    React.useEffect(() => {
      if (invoiceId) {
        getInvoiceListConnect({ id: invoiceId })
          .then((res) => {
            const resCopy = JSON.parse(JSON.stringify(res));
            const { goodsDescription: { items: storedItems = [] } = {} } = resCopy;

            const map = storedItems.reduce((acc, item) => {
              if (item.itemId) {
                acc[item.itemId] = Number(item.qty);
              }
              return acc;
            }, {});

            setInvoiceQtyMap(map); // ✅ THIS triggers re-render
          });
      }
  }, [invoiceId]);

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align='center'>Sno</TableCell>
          <TableCell>Description</TableCell>
          <TableCell align='center'>Work Order</TableCell>
          <TableCell align='center'>Unit</TableCell>
          <TableCell align='center'>Rate</TableCell>

          {isCompanyAshok && (
            <TableCell align='center'>Rate (-BDS)</TableCell>
          )}

          <TableCell align="center">
            {isEditMode ? "Available" : "Pending"}
          </TableCell>

          <TableCell align="center">Dispatch</TableCell>
          <TableCell align="center">Remaining</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {poItems.map((poItem, index) => {


          const key = poItem.itemId;
          const selected = selectedItems?.[key];

          const alreadyDispatched = invoiceQtyMap?.[poItem.itemId] || 0;

          const availableQty = isEditMode
            ? poItem.pendingQty + alreadyDispatched
            : poItem.pendingQty;

          const dispatchQty = selected?.dispatchQty;

          const remainingQty = availableQty - (Number(dispatchQty) || 0);

          return (
            <TableRow key={key}>

              {/* Checkbox */}
              <TableCell>
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
              </TableCell>

              {/* Sno */}
              <TableCell align='center'>
                {poItem.itemNo || index + 1}
              </TableCell>

              {/* Description */}
              <TableCell className='tabelCellElippis' sx={{minWidth: 200}}>
                {poItem.description}
              </TableCell>

              {/* Work Order */}
              <TableCell align='center' sx={{minWidth: 200}}>
                {poItem.workOrder}
              </TableCell>

              {/* Unit */}
              <TableCell align='center'>
                {poItem.unit}
              </TableCell>

              {/* Rate */}
              <TableCell align='center'>
                {poItem.rate}
              </TableCell>

              {/* BDS */}
              {isCompanyAshok && (
                <TableCell align='center'>
                  {deductPercent(poItem.rate)}
                </TableCell>
              )}

              {/* 🔥 Available / Pending */}
              <TableCell align="center">
                {availableQty}
              </TableCell>

              {/* Dispatch */}
              <TableCell align="center">
                {selected ? (
                  <TextField
                    size="small"
                    type="number"
                    value={dispatchQty}
                    sx={{
                      width: 60
                    }}
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
                )}
              </TableCell>

              {/* Remaining */}
              <TableCell
                align="center"
                sx={{
                  color:
                    remainingQty === 0
                      ? 'green'
                      : remainingQty < 0
                      ? 'red'
                      : 'inherit'
                }}
              >
               {remainingQty}
              </TableCell>

            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PoTable;