import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { COMPANY_TYPE } from "../../constants/app-constant";

const Dashboard = () => {
    const [value, setValue] = useState(COMPANY_TYPE.ASHOK);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="company tabs">
                            <Tab label="Ashok" value={COMPANY_TYPE.ASHOK} />
                            <Tab label="Rajasthan" value={COMPANY_TYPE.RAJASTHAN} />
                            <Tab label="Rajasthan Explosives" value={COMPANY_TYPE.RAJASTHAN_EXPLOSIVES} />
                        </TabList>
                    </Box>
                    <TabPanel value={COMPANY_TYPE.ASHOK}>
                        <Typography variant="h6">Ashok Dashboard Content</Typography>
                    </TabPanel>
                    <TabPanel value={COMPANY_TYPE.RAJASTHAN}>
                        <Typography variant="h6">Rajasthan Dashboard Content</Typography>
                    </TabPanel>
                    <TabPanel value={COMPANY_TYPE.RAJASTHAN_EXPLOSIVES}>
                        <Typography variant="h6">Rajasthan Explosives Dashboard Content</Typography>
                    </TabPanel>
                </TabContext>
            </Paper>
        </Box>
    );
};

export default Dashboard;