import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const getAvatarInitials = (name) => {
    if (!name) return "";

    const words = name
        .trim()
        .split(" ")
        .filter(Boolean);

    if (words.length === 1) {
        return words[0][0].toUpperCase();
    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
};

const TopBar = ({ onMenuClick }) => {
    const { user } = useSelector(
        (state) => state.auth
    );

    const [anchorEl, setAnchorEl] =
        useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="topbar">
            <Box
                display="flex"
                alignItems="center"
                marginLeft="20px"
            >
                <IconButton onClick={onMenuClick}>
                    <MenuIcon className="menuIcon" />
                </IconButton>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                marginRight="20px"
            >
                <IconButton
                    onClick={handleOpen}
                    size="small"
                    aria-controls={
                        open ? "account-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={
                        open ? "true" : undefined
                    }
                >
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#000000",
                        }}
                    >
                        {getAvatarInitials(
                            user?.displayName ||
                            user?.email ||
                            ""
                        )}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "center",
                    }}
                >
                    <MenuItem>
                        {user?.email}
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    );
};

export default TopBar;