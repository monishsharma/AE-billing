import React, { useState } from 'react';

import HeroSection from '../../components/hero-section';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Tab } from '@mui/material';
import ItemTable from '../../components/item-table';
import Swal from 'sweetalert2';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

const Config = ({
    config,
    getAppConfigConnect,
    updateAppConfigConnect,
    deleteConfigValueConnect
}) => {


    const navigate = useNavigate();
    const { itemType } = useParams();
    const { appConfig = {} } = config || {};

    const [selectedTab, setSelectedTab] = useState(itemType || "");

    React.useEffect(() => {
        getAppConfigConnect()
            .then(({ data }) => {
                if (!itemType) setSelectedTab(Object.keys(data)[0]);
            })
    }, []);

    const onClickHeroBtn = () => {
        navigate("/settings/config/add");
    };

    const onChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
        navigate(`/settings/config/${newValue}`)
    }

    const onSave = (updatedItem, editingItem = false,) => {
        const { itemType, ...rest } = updatedItem;

        updateAppConfigConnect(rest, itemType)
            .then(async () => {
                await getAppConfigConnect();
                Swal.fire({
                    title: "Successfuly Added",
                    icon: "success"
                })
            })
            .catch((error) => {
                // Swal.fire({
                //     title: error,
                //     icon: "error"
                // })
            });

    }

    const onEdit = (itemType) => {
        navigate(`/settings/config/edit/${itemType}`)
    }

    return (
        <div>
            <HeroSection
                pageTitle="Config"
                btnText="Add Master Config"
                onClick={onClickHeroBtn}
            />

            <TabContext value={selectedTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                    <TabList
                        // variant='fullWidth'
                        textColor="black"
                        onChange={onChangeTab}
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#000",
                            },
                        }}
                    >
                        {
                            Object.keys(appConfig).map((key, index) => {
                                return (
                                    <Tab
                                        key={`${key}_${index}`}
                                        label={appConfig[key].title}
                                        value={key}
                                    />
                                )
                            })
                        }
                    </TabList>
                </Box>


                <Grid container spacing={2}>
                    <Grid
                        item
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        {
                            Object.keys(appConfig).map((key, index) => {
                                const configItem = appConfig[key];
                                return (

                                    <TabPanel
                                        value={key} sx={{ p: 0 }}
                                    >
                                        <ItemTable
                                            data={configItem.values}
                                            columns={configItem.columns}
                                            itemType={key}
                                            onSave={onSave}
                                            onEdit={onEdit}
                                            getItem={getAppConfigConnect}
                                            title={configItem.title}
                                            deleteItem={deleteConfigValueConnect}
                                            swalText={`Do You Want to Delete the ${configItem.title}`}
                                            btnTitle={`ADD ${configItem.title.toUpperCase()}`}
                                        />
                                    </TabPanel>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </TabContext>


        </div>
    )
}

export default Config