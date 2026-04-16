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
import { columns, deductPercent } from './selector';

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

  const getStatus = (availableQty, remainingQty) => {
    if (remainingQty === availableQty) return "Pending";
    if (remainingQty === 0) return "Completed";
    return "Partial";
  };

  const cols = columns({ isCompanyAshok, isEditMode, getStatus  });




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
          {cols.map((col) => (
            <TableCell key={col.key} align={col.align || "left"}>
              {col.label}
            </TableCell>
          ))}
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



          const rowData = {
            poItem,
            index,
            selected,
            dispatchQty,
            availableQty,
            remainingQty,
            handleQtyChange,
            handleSelectItem,
            data,
            totalQty: poItem.qty,
            selectedPo
          };

          return (
            <TableRow key={key}
            >
              {cols.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align || "left"}
                  sx={col.getSx ? col.getSx(rowData) : col.sx}
                >
                  {col.render(rowData)}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PoTable;