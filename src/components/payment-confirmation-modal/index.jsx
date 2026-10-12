import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const paymentModes = [
    {
        value: "bank_transfer",
        label: "Bank Transfer",
        referenceLabel: "UTR / Transaction No."
    },
    {
        value: "cheque",
        label: "Cheque",
        referenceLabel: "Cheque No."
    },
    {
        value: "cash",
        label: "Cash",
        referenceLabel: null
    }
];

const PaymentConfirmationModal = ({
    paymentAmount,
    openPaymentModal,
    setPaymentAmount,
    selectedInvoice,
    isLoading,
    handlePaymentSubmit,
    handleClosePaymentModal
}) => {
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const [referenceNo, setReferenceNo] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (openPaymentModal && selectedInvoice) {

            setPaymentDate(
                new Date().toISOString().split("T")[0]
            );

            setPaymentMode("");
            setReferenceNo("");
            setErrors({});
        }
    }, [openPaymentModal, selectedInvoice]);

    const selectedPaymentMode = paymentModes.find(
        (mode) => mode.value === paymentMode
    );

    const duePayment = Number(paymentAmount);

    const validate = () => {
        const newErrors = {};

        const amount = Number(paymentAmount);

        if (!Number.isFinite(amount) || amount <= 0) {
            newErrors.paymentAmount =
                "Payment amount must be greater than 0";
        }

        if (!paymentDate) {
            newErrors.paymentDate =
                "Payment date is required";
        }

        if (!paymentMode) {
            newErrors.paymentMode =
                "Payment mode is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }

        handlePaymentSubmit({
            invoiceId: selectedInvoice._id,
            paymentAmount: Number(paymentAmount),
            date: paymentDate,
            mode: paymentMode,
            paid: true,
            duePayment: parseFloat(selectedInvoice.goodsDescription.Total) - parseFloat(paymentAmount),
            referenceNo: referenceNo.trim() || null
        });
    };

    const handleAmountChange = (e) => {
        setPaymentAmount(e.target.value);

        if (errors.paymentAmount) {
            setErrors((prev) => ({
                ...prev,
                paymentAmount: ""
            }));
        }
    };

    const handleDateChange = (e) => {
        setPaymentDate(e.target.value);

        if (errors.paymentDate) {
            setErrors((prev) => ({
                ...prev,
                paymentDate: ""
            }));
        }
    };

    const handleModeChange = (e) => {
        setPaymentMode(e.target.value);
        setReferenceNo("");

        if (errors.paymentMode) {
            setErrors((prev) => ({
                ...prev,
                paymentMode: ""
            }));
        }
    };

    const handleClose = () => {
        setPaymentAmount("");
        setPaymentDate("");
        setPaymentMode("bank_transfer");
        setReferenceNo("");
        setErrors({});

        handleClosePaymentModal();
    };

    return (
        <Modal
            open={openPaymentModal}
            onClose={handleClose}
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
                    borderRadius: 2
                }}
            >
                <Typography
                    id="payment-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mb: 3 }}
                >
                    Enter Payment for{" "}
                    {selectedInvoice?.invoiceDetail?.invoiceNO}
                </Typography>

                {/* Payment Amount */}
                <TextField
                    fullWidth
                    label="Payment Amount"
                    type="number"
                    value={paymentAmount}
                    onChange={handleAmountChange}
                    error={Boolean(errors.paymentAmount)}
                    helperText={errors.paymentAmount}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <Typography sx={{ mr: 1 }}>
                                ₹
                            </Typography>
                        )
                    }}
                />

                {/* Payment Date */}
                <TextField
                    fullWidth
                    label="Payment Date"
                    type="date"
                    value={paymentDate}
                    onChange={handleDateChange}
                    error={Boolean(errors.paymentDate)}
                    helperText={errors.paymentDate}
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                {/* Payment Mode */}
                <TextField
                    fullWidth
                    select
                    label="Payment Mode"
                    value={paymentMode}
                    onChange={handleModeChange}
                    error={Boolean(errors.paymentMode)}
                    helperText={errors.paymentMode}
                    sx={{ mb: 2 }}
                >
                    {paymentModes.map((mode) => (
                        <MenuItem
                            key={mode.value}
                            value={mode.value}
                        >
                            {mode.label}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Reference Number */}
                {selectedPaymentMode?.referenceLabel && (
                    <TextField
                        fullWidth
                        label={selectedPaymentMode.referenceLabel}
                        value={referenceNo}
                        onChange={(e) =>
                            setReferenceNo(e.target.value)
                        }
                        sx={{ mb: 3 }}
                    />
                )}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2
                    }}
                >
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        className="outlinedCustomBtn"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isLoading}
                        className="customBtn"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PaymentConfirmationModal;