import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { COMPANY_TYPE } from "../constants/app-constant";

const withTabs = (WrappedComponent) => {

    return function TabsHOC(props) {
        const [value, setValue] = useState(COMPANY_TYPE.ASHOK);

        const handleChange = (_, newValue) => {
        setValue(newValue);
        };

        return (
        <Box>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        textColor="black"
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#000", // set your custom color
                            },
                        }}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label={COMPANY_TYPE.ASHOK} value={COMPANY_TYPE.ASHOK} />
                        <Tab label={COMPANY_TYPE.PADMA} value={COMPANY_TYPE.PADMA} />
                    </TabList>
                </Box>
                <WrappedComponent
                    {...props}
                    activeCompany={value}
                />
            </TabContext>

        </Box>
        );
    };
};

export default withTabs;
