import React from "react";
import styles from "./style.module.css";
import TextField from '@mui/material/TextField';
import { STEPPER_NAME } from "../../constants/app-constant";


const Summary = ({
    invoiceForm,
    saveDataConnect
}) => {

    const {
        [STEPPER_NAME.BUYER_DETAIL]: {
            isInterState
        },
        [STEPPER_NAME.GOODS_DESCRIPTION]: {
            Total, SGST, CGST, freight, roundOff = 0, taxableValue, items = []
        }
    } = invoiceForm;

    const totalQTY = items.reduce((total, item) => total + (parseFloat(item.qty) || 0), 0);

    const onChange = ({target: {value}}) => {
        saveDataConnect({
            stepName: STEPPER_NAME.GOODS_DESCRIPTION,
            data: {
                freight: value
            }
        })
    }

    return (
        <>
            <div className={styles.summaryContainer}>
                <div className={`${styles.summaryContainer} ${styles.summaryWrapper}`}>
                     <div>
                        <span>Total Qty</span>
                        <span>
                            <TextField
                                fullWidth
                                name={"qty"}
                                value={totalQTY.toFixed(2)}
                                disabled
                                variant="standard"
                                onChange={onChange}
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                  }}
                            />
                        </span>
                    </div>
                    <div>
                        <span>Freight</span>
                        <span>
                            <TextField
                                fullWidth
                                name={"freight"}
                                value={freight}
                                variant="standard"
                                onChange={onChange}
                            />
                        </span>
                    </div>
                    <div>
                        <span>Taxable Value</span>
                        <span>
                            <TextField
                                fullWidth
                                name={"taxableValue"}
                                value={taxableValue}
                                variant="standard"
                                onChange={onChange}
                                disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                  }}
                            />
                        </span>
                    </div>
                    {
                        isInterState?
                        <div>
                            <span>IGST (18%)</span>
                            <span>
                            <TextField
                                    fullWidth
                                    name={"CGST"}
                                    value={`${parseFloat(CGST) + parseFloat(SGST)}`}
                                    variant="standard"
                                    disabled
                                    sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                          WebkitTextFillColor: "#000000",
                                        },
                                      }}
                                />
                            </span>
                        </div>
                        :
                        <>
                            <div>
                                <span>CGST (9%)</span>
                                <span>
                                <TextField
                                        fullWidth
                                        name={"SGST"}
                                        value={SGST}
                                        variant="standard"
                                        disabled
                                        sx={{
                                            "& .MuiInputBase-input.Mui-disabled": {
                                              WebkitTextFillColor: "#000000",
                                            },
                                          }}
                                    />
                                </span>
                            </div>
                            <div>
                                <span>SGST (9%)</span>
                                <span>
                                <TextField
                                        fullWidth
                                        name={"CGST"}
                                        value={CGST}
                                        variant="standard"
                                        disabled
                                        sx={{
                                            "& .MuiInputBase-input.Mui-disabled": {
                                              WebkitTextFillColor: "#000000",
                                            },
                                          }}
                                    />
                                </span>
                            </div>
                        </>
                    }

                    <div>
                        <span>Round Off</span>
                        <span>
                        <TextField
                                fullWidth
                                name={"roundOff"}
                                value={roundOff}
                                variant="standard"
                                disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                  }}
                            />
                        </span>
                    </div>

                    <div>
                        <span>Total</span>
                        <span>
                        <TextField
                                fullWidth
                                name={"Total"}
                                value={Total}
                                variant="standard"
                                disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#000000",
                                    },
                                  }}
                            />
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Summary;