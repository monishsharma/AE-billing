import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SideBar from "./shared/components/sidebar";
import Layout from "./shared/components/layout";
import { isMobileDevice } from "./helpers/is-mobile-device";
import { Outlet } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getVendorList } from "./store/config/action";
import { connect, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { checkAuthState } from "./store/auth/action";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

const App = ({ getVendorListConnect }) => {
  const scrollableDivRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useSelector((state) => state.auth);
  const [isActive, setIsActive] = useState(isMobileDevice() ? true : false);
  const dispatch = useDispatch();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    getVendorListConnect();
  }, [getVendorListConnect]);

  const toggleNavigation = () => {
    setIsActive(!isActive);
  };

  const handleScroll = () => {
    if (scrollableDivRef.current && scrollableDivRef.current.scrollTop > 1) {
      localStorage.setItem("scroll", scrollableDivRef.current.scrollTop);
    }
  };

  function getAvatarInitials(name) {
  if (!name) return "";

  // Split the name into words
  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 1) {
    // If only one word, take first two letters
    return words[0].substring(0, 1).toUpperCase();
  } else {
    // Take first letter of first and last word
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
}

  return (
    <>
      <ToastContainer />
      <Layout>
        <SideBar
          isActive={isActive}
          toggleNavigation={setIsActive}
          onClick={toggleNavigation}
        />
        <div className={isActive ? "main active bigmain" : "main smallmain"}>
          <div className="topbar">
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              marginLeft={"20px"}
            >
              <MenuIcon className="menuIcon" onClick={toggleNavigation} />
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginRight: "20px",
              }}
            >
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 40, height: 40 }} sx={{ bgcolor: "#000000" }}>
                      {getAvatarInitials(user?.displayName || user?.email || "")}
                    </Avatar>
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "center" }}
                >
                  <MenuItem>{user.email}</MenuItem>

                  {/* <MenuItem>Logout</MenuItem> */}
                </Menu>
              </React.Fragment>
            </div>
          </div>
          <div
            className="scrollableDiv"
            ref={scrollableDivRef}
            onScroll={handleScroll}
          >
            <Outlet context={{ ref: scrollableDivRef, isActive }} />
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = ({ config }) => ({ config });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getVendorListConnect: getVendorList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
