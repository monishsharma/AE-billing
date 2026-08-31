import React, { useState } from 'react'
import HeroSection from '../hero-section';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLUMNS, INPUTS } from './selector';
import { useNavigate, useParams } from 'react-router-dom';
import { isMobileDevice } from '../../helpers/is-mobile-device';

const AddConfig = ({
    getAppConfigConnect,
    postAppConfigConnect
}) => {

    const Navigate = useNavigate();
    const { itemType } = useParams();

    const [config, setConfig] = useState({
        key: "",
        title: "",
        columns: [
            {
                key: "",
                title: "",
                type: "text",
            },
        ],
    });

    React.useEffect(() => {
        if (itemType) {
            getAppConfigConnect()
            .then(({data}) => {
                setConfig({
                    key: itemType,
                    ...data[itemType]
                });
            })
        }
    }, [itemType]);

    const handleChange = (key, value) => {
        setConfig((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleColumnChange = (index, field, value) => {
        setConfig((prev) => ({
            ...prev,
            columns: prev.columns.map((column, i) =>
                i === index
                    ? {
                        ...column,
                        [field]: value,
                    }
                    : column
            ),
        }));
    };

    const addColumn = () => {
        setConfig((prev) => ({
            ...prev,
            columns: [
                ...prev.columns,
                {
                    key: "",
                    title: "",
                    type: "text",
                },
            ],
        }));
    };

    const removeColumn = (index) => {
        setConfig((prev) => ({
            ...prev,
            columns: prev.columns.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {

            await postAppConfigConnect(config);

            setConfig({
                key: "",
                title: "",
                columns: [
                    {
                        key: "",
                        title: "",
                        type: "text",
                    },
                ],
            });

            Navigate(-1, {replace: true});

        } catch (error) {

            console.error("Error submitting config:", error);
        }
    };
    return (
        <div>
            <HeroSection
                pageTitle="Add Config"
                showButton={false}
            />
            <div className="mt-3">
                <Card sx={{ minHeight: "75vh", margin: "0 auto" }} variant='outlined'>
                    <CardContent>
                        <Typography variant="h6" mb={2}>
                            Config Detail
                        </Typography>
                        <Grid container spacing={2}>
                            {
                                INPUTS.map((input, index) => {
                                    const Component = input.component;
                                    return (
                                        <Grid key={index} item size={{xs:12, md: 6}}>
                                            <Component
                                                fullWidth
                                                label={input.label}
                                                value={config[input.name]}
                                                placeholder={input.placeholder}
                                                onChange={(e) => handleChange(input.name, e.target.value)}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                        <Box mt={4}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography variant="h6">
                                    Columns
                                </Typography>

                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={addColumn}
                                    className="outlinedCustomBtn"
                                >
                                    Add Column
                                </Button>
                            </Box>

                            {config.columns.map((column, index) => (
                                <Grid
                                    container
                                    spacing={4}
                                    alignItems="center"
                                    key={index}
                                    mb={4}
                                >
                                    {
                                        COLUMNS.map((col, idx) => {
                                            const Component = col.component;
                                            return (
                                                <Grid key={idx} item size={{xs:12, md: 3}}>
                                                    <Component
                                                        fullWidth
                                                        label={col.label}
                                                        placeholder={col.placeholder}
                                                        value={column[col.name]}
                                                        select={col.type === "select"}
                                                        onChange={(e) => handleColumnChange(index, col.name, e.target.value)}
                                                    >
                                                        {col.type === "select" && col.options.map((option, optIdx) => (
                                                            <MenuItem key={optIdx} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Component>
                                                </Grid>
                                            )
                                        })
                                    }
                                    {
                                        isMobileDevice() ?
                                        <Button
                                            fullWidth
                                            variant='outlined'
                                            color="error"
                                            disabled={config.columns.length === 1}
                                            onClick={() => removeColumn(index)}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                        :
                                        <IconButton
                                            color="error"
                                            disabled={config.columns.length === 1}
                                            onClick={() => removeColumn(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }

                                </Grid>
                            ))}
                        </Box>

                        <Box mt={4} sx={{display: "flex", gap: 2}}>
                            <Button
                                variant="contained"
                                className="customBtn"
                                onClick={handleSubmit}
                            >
                                {
                                    itemType ? "Edit Config" : "Create Config"
                                }
                            </Button>
                            <Button
                                variant="contained"
                                className="outlinedCustomBtn"
                                onClick={() => Navigate(-1)}
                            >
                                Back
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddConfig;