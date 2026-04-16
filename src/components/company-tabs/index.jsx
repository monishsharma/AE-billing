import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {COMPANY_TYPE} from "../../constants/app-constant"
import { useParams } from "react-router-dom";

const CompanyTabs = ({
    onChange,
    renderContent = () => {},
}) => {

     const { company } = useParams();

    return (
        <TabContext value={company}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                    textColor="black"
                    onChange={onChange}
                    sx={{
                        "& .MuiTabs-indicator": {
                        backgroundColor: "#000",
                        },
                    }}
                >
                    <Tab label={COMPANY_TYPE.ASHOK} value={COMPANY_TYPE.ASHOK} />
                    <Tab label={COMPANY_TYPE.PADMA} value={COMPANY_TYPE.PADMA} />
                </TabList>
            </Box>

            <TabPanel value={COMPANY_TYPE.ASHOK} sx={{ p: 0 }}>
                {renderContent(COMPANY_TYPE.ASHOK)}
            </TabPanel>

            <TabPanel value={COMPANY_TYPE.PADMA} sx={{ p: 0 }}>
                {renderContent(COMPANY_TYPE.PADMA)}
            </TabPanel>
        </TabContext>
    );
};

export default CompanyTabs;
