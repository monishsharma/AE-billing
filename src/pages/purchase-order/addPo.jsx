import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const AddPo = ({ open, onClose = () => { }, addPOConnect = () => { } }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [jsonText, setJsonText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
    if (open) {
        setJsonText("");
        setError("");
        setIsLoading(false);
    }
}, [open]);

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(jsonText);

            setJsonText(JSON.stringify(parsed, null, 2));
            setError("");
        } catch (err) {
            setError("Invalid JSON. Please check the syntax.");
        }
    };

    const isValidJson = (value) => {
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
        };

    const handleSave = async() => {
        try {
            setIsLoading(true);
            const isvalid = isValidJson(jsonText);
            if (!isvalid) {
                setError("Invalid JSON. Please check the syntax.");
                setIsLoading(false);
                return;
            }
            setError("");
            addPOConnect(jsonText)
                .then(async () => {
                    Swal.fire(({
                        title: "Succesfully Added",
                        icon: "success"
                    })
                )
                    onClose(true)

                    // swal fire ok should close the modal

                    setIsLoading(false);

                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        text: err.message,
                    })
                    setIsLoading(false);

                }
            )
        }
        catch (err) {
            Swal.fire({
                icon: "error",
                text: err.message,
            })
            setIsLoading(false);

        }

    };

    const handleChange = (e) => {
        setJsonText(e.target.value);

        if (error) {
            setError("");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: "hidden",
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.5,
                    px: 2.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        Add PO JSON
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "text.secondary",
                            mt: 0.3,
                        }}
                    >
                        Paste the purchase order JSON below
                    </Typography>
                </Box>

                <IconButton onClick={onClose} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            {/* Content */}
            <DialogContent
                sx={{
                    p: 2.5,
                    backgroundColor: "#f7f7f8",
                }}
            >
                {/* Editor Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        mt: 1
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        PO JSON
                    </Typography>


                    <Tooltip title="Format JSON">
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<FormatAlignLeftIcon />}
                            className="outlinedCustomBtn"
                            onClick={handleFormat}
                            sx={{
                                textTransform: "none",
                                fontSize: 12,
                                minWidth: 0,
                            }}
                        >
                            Format
                        </Button>
                    </Tooltip>
                </Box>

                 {/* Error */}
                {error && (
                    <Typography
                        sx={{
                            color: "error.main",
                            fontSize: 12,
                            mb: 1
                        }}
                    >
                        {error}
                    </Typography>
                )}

                {/* JSON Editor */}
                <Box
                    sx={{
                        position: "relative",
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: error ? "error.main" : "#303030",
                        backgroundColor: "#1e1e1e",
                    }}
                >
                    {/* Fake editor top bar */}
                    <Box
                        sx={{
                            height: 34,
                            display: "flex",
                            alignItems: "center",
                            px: 1.5,
                            backgroundColor: "#252526",
                            borderBottom: "1px solid #333",
                        }}
                    >
                        <Box
                            sx={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                backgroundColor: "#ff5f56",
                                mr: 0.7,
                            }}
                        />

                        <Box
                            sx={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                backgroundColor: "#ffbd2e",
                                mr: 0.7,
                            }}
                        />

                        <Box
                            sx={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                backgroundColor: "#27c93f",
                                mr: 1.5,
                            }}
                        />

                        <Typography
                            sx={{
                                color: "#aaa",
                                fontSize: 12,
                                fontFamily: "monospace",
                            }}
                        >
                            po.json
                        </Typography>
                    </Box>

                    <Box
                        component="textarea"
                        value={jsonText}
                        disabled={isLoading}
                        onChange={handleChange}
                        spellCheck={false}
                        placeholder={`{
    "poNumber": "",
    "poDate": "",
    "items": [
        {
        "itemNo": 10,
        "description": "",
        "quantity": 0
        }
    ]
}`}
                        sx={{
                            display: "block",
                            width: "100%",
                            minHeight: 350,
                            maxHeight: 400,
                            resize: "vertical",
                            border: "none",
                            outline: "none",
                            padding: "16px",
                            boxSizing: "border-box",

                            backgroundColor: "#1e1e1e",
                            color: "#d4d4d4",

                            fontFamily:
                                '"Fira Code", "Cascadia Code", Consolas, monospace',
                            fontSize: 13,
                            lineHeight: 1.6,

                            tabSize: 2,

                            "&::placeholder": {
                                color: "#666",
                                opacity: 1,
                            },

                            "&:focus": {
                                outline: "none",
                            },
                        }}
                    />
                </Box>



                {/* Hint */}
                {!error && (
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 11,
                            mt: 1,
                        }}
                    >
                        Tip: Paste valid JSON and use <b>Format</b> to automatically
                        indent it.
                    </Typography>
                )}
            </DialogContent>

            {/* Actions */}
            <DialogActions
                sx={{
                    px: 2.5,
                    py: 1.5,
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        textTransform: "none",
                        color: "text.secondary",
                    }}
                    className="outlinedCustomBtn"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    // className="customBtn"
                    loading={isLoading}
                    sx={{
                        textTransform: "none",
                        px: 3,
                        background: "black"
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPo;