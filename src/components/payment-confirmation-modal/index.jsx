import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import React from 'react';

const PaymentConfirmationModal = ({
    openPaymentModal,
    selectedInvoice,
    paymentAmount,
    setPaymentAmount,
    isLoading,
    handlePaymentSubmit,
    handleClosePaymentModal
}) => {
  return (
    <Modal
        open={openPaymentModal}
        onClose={handleClosePaymentModal}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
    >
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}
        >
            <Typography
                id="payment-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
            >
                Enter Amount for {selectedInvoice?.invoiceDetail?.invoiceNO}
            </Typography>
            <TextField
                fullWidth
                label="Payment Amount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={handleClosePaymentModal} variant="outlined" className="outlinedCustomBtn">
                    Cancel
                </Button>
                <Button
                    onClick={handlePaymentSubmit}
                    variant="contained"
                    disabled={isLoading}
                    className="customBtn"
                >
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </Box>
        </Box>
    </Modal>
  )
}

export default PaymentConfirmationModal;