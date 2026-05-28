import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { toast, Bounce } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: 10,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    background: "white",
    padding: 20
};





const BakeliteRateConfig = ({
    open,
    config,
    toggleModal
}) => {

    const showToast = React.useCallback(({ type, text, ...rest }) =>
        toast[type](text, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            ...rest,
    }), []);

    const { bakeliteRates } = config;

    const INPUT = [
        {
            key: "thickness",
            label: "Thickness",
            component: TextField,
            type: "select",
            options: bakeliteRates?.map(item => ({
                label: item.label,
                value: item._id
            })),
            extraProps: {
                select: true,
            },
        },
        {
            key: "inputLength",
            label: "Length",
            type: "textField",
            component: TextField
        },
        {
            key: "width",
            label: "Width",
            type: "textField",
            component: TextField
        },
        {
            key: "rate",
            label: "Rate",
            component: TextField,
            type: "textField",
            extraProps: {
                disabled: true
            }
        }
    ]

    const [detail, setDetail] = useState(INPUT.reduce((acc, curr) => {
        acc[curr.key] = "";
        return acc;
    }, {}))

    React.useEffect(() => {
        if (detail.thickness && detail.inputLength && detail.width) {
            let calculatedRate = 0;
            const selectedRate = bakeliteRates.find(rate => rate._id === detail.thickness);
            const rate = selectedRate ? selectedRate.rate : 0;
            if (selectedRate.label === "5MM") {
                calculatedRate = ((detail.inputLength) * rate).toFixed(2);
            } else {
                calculatedRate = parseInt((((detail.inputLength * detail.width) / 93025) * rate));
            }

            setDetail(prev => ({
                ...prev,
                rate: Math.round(calculatedRate)
            }))
        } else {
            setDetail(prev => ({
                ...prev,
                rate: ""
            }))
        }
    }, [detail.thickness, detail.inputLength, detail.width, bakeliteRates])


    const onChange = (e, item) => {
        const { value } = e.target;
        let selectedRate = null;
        if (item.key === "thickness") {
            selectedRate = bakeliteRates.find(rate => rate._id === value);
        }
        if (item.key === "thickness") {
            setDetail(prev => ({
                ...prev,
                [item.key]: value,
                ...(selectedRate && selectedRate.label === "5MM" ? {
                    "width": "15",
                    "inputLength": "",
                    "rate": "",
                }: {
                    "width": "",
                    "inputLength": "",
                    "rate": "",
                })
            }))
        } else {
            setDetail(prev => ({
                ...prev,
                [item.key]: value
            }))
        }


    }

    const onSaveHandler = async () => {
    try {
        await navigator.clipboard.writeText(String(detail.rate));

        showToast({
            type: "success",
            text: `Rate ${detail.rate} copied to clipboard`
        });
        setDetail(INPUT.reduce((acc, curr) => {
            acc[curr.key] = "";
            return acc;
        }, {}));
        toggleModal();

    } catch (err) {
        console.error(err);

        showToast({
            type: "error",
            text: "Failed to copy text"
        });
    }
};

    return (
        <Modal open={open} onClose={toggleModal}>
                <Box style={style}>
                    <Box
                        // px={3}
                        pt={2}
                        pb={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h5" fontWeight={600}>Calculate Bakelite Rate </Typography>
                        <CloseOutlinedIcon
                            onClick={toggleModal}
                            sx={{ cursor: 'pointer' }}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            gap: 2,
                            mb: 4,
                            mt: 2,
                            flexDirection: "row"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {
                            INPUT.map((item, index) => {
                                const options = item?.options;
                                return (
                                    <item.component
                                        {...item.extraProps}
                                        id={item.label}
                                        name={item.label}
                                        fullWidth
                                        key={index}
                                        label={item.label}
                                        value={detail[item.key] || ""}
                                        onChange={(e) => onChange(e, item)}
                                        placeholder={item.label}
                                        type={item.type}
                                    >
                                        {
                                            options?.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value} >
                                                    {opt.label}
                                                </MenuItem>
                                        ))}
                                    </item.component>
                                )
                            })
                        }
                    </Box>

                    <Button disabled={detail.rate === ""} variant='contained' className='customBtn' onClick={onSaveHandler}>Copy Rate to Clipboard</Button>
                </Box>
            </Modal>
    )
}

export default BakeliteRateConfig