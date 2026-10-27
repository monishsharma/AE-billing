import React from "react";
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
    Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
    "Fetching next invoice number",
    "Preparing Invoice data",
    "Navigation to invoice page",
];

const PreparationStepIcon = ({
    active,
    completed,
    icon,
}) => {
    if (completed) {
        return (
            <CheckCircleIcon
                sx={{
                    color: "success.main",
                    fontSize: 24,
                }}
            />
        );
    }

    if (active) {
        return <CircularProgress size={24} thickness={5} />;
    }

    return (
        <Box
            sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "text.disabled",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "text.secondary",
                boxSizing: "border-box",
            }}
        >
            {icon}
        </Box>
    );
};

const InvoicePreparationLoader = ({
    open,
    activeStep,
    error,
    onRetry,
    onClose,
}) => {
    return (
        <Dialog
            open={open}
            maxWidth="xs"
            fullWidth
            onClose={error ? onClose : undefined}
            disableEscapeKeyDown={!error}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                },
            }}
        >
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap={1}
                    py={2}
                >
                    <Typography variant="h6" fontWeight={700}>
                        {error
                            ? "Couldn't prepare invoice"
                            : "Preparing your invoice"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {error
                            ? "Something went wrong while preparing the invoice."
                            : "Please wait while we get everything ready."}
                    </Typography>
                </Box>

                <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    sx={{ mt: 2 }}
                >
                    {steps.map((label, index) => (
                        <Step
                            key={label}
                            completed={index < activeStep}
                        >
                            <StepLabel
                                StepIconComponent={PreparationStepIcon}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={index === activeStep ? 600 : 400}
                                    color={
                                        index === activeStep
                                            ? "text.primary"
                                            : "text.secondary"
                                    }
                                >
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && (
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        gap={1}
                        mt={3}
                    >
                        <Button onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={onRetry}
                        >
                            Retry
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default InvoicePreparationLoader;