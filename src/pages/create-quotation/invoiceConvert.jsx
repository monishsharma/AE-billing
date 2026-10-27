import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Typography } from '@mui/material'
import React from 'react'

const ConvertToInvoice = ({
  open,
  handleClose,
  items,
  companyType,
  invoicedItems,
  onSubmit = () => {}
}) => {


  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleSumbit = () => {
    if (companyType === "ASHOK") {
      const updatedItems = selectedItems.map(item => {
        const updatedRate = item.rate - (item.rate * 0.0125);
        return { ...item, rate: updatedRate };
      });
      onSubmit(updatedItems);
    } else {
      onSubmit(selectedItems);
    }
  }


  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected._id === item._id)
        ? prev.filter((selected) => selected._id !== item._id)
        : [...prev, item]
    );
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography fontSize={20} fontWeight={700}>
          Convert Quotation to Invoice
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Select the items you want to convert to invoice.
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          px: 3,
          pt: "20px !important",
          pb: 3,
        }}
      >
        {/* User need to select items that should be converted to invoice */}
        {/* use mui  */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "300px", overflowY: "auto", gap: 1 }}>
          {items.map((item, index) => {
            const alreadyInvoiced = invoicedItems?.includes(
              String(item._id)
            );
            return (
            <Box
              key={item._id}
              onClick={() => toggleItem(item)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                border: "1px solid",
                borderColor:  "divider",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.15s ease",
                "&:hover": {
                  borderColor: "black",
                },
              }}
            >
              <Checkbox
                checked={alreadyInvoiced || selectedItems.some(
                  (selected) => selected._id === item._id
                )}
                onClick={(e) => e.stopPropagation()}
                disabled={alreadyInvoiced}
                onChange={() => {
                  if (!alreadyInvoiced) {
                    toggleItem(item);
                  }
                }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={500}>
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Rate - ₹{item.rate}
                </Typography>

              </Box>

              <Typography fontWeight={400} whiteSpace="nowrap">
                {item.drawingNo}
              </Typography>
            </Box>
          )
          })}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          className="outlinedCustomBtn"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          className="customBtn"
          disabled={selectedItems.length === 0}
          onClick={handleSumbit}
        >
          Create Invoice
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default ConvertToInvoice