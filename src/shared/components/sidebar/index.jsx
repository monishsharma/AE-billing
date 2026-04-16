import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./styles.css";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { isMobileDevice } from "../../../helpers/is-mobile-device";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/auth/action';
import AE from "../../../assets/logo.png"
import { PAGES, ROUTES } from "./selector";
import { Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const SideBar = ({
    isActive,
    toggleNavigation
}) => {
    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();
    const [openDropdown, setOpenDropdown] = useState(1);

    useEffect(() => {
    const activeIndex = PAGES.findIndex((page) =>
        page.children?.some((child) => pathname.includes(child.path))
    );

    if (activeIndex !== -1) {
        setOpenDropdown(activeIndex);
    }
}, [pathname]);

    const onClick = () => {
        if (isMobileDevice()) {
            toggleNavigation(true)
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const toggleDropdown = (e, index) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const getActiveClass = (currentPath, routePath, isExactRoute = false) => {
        return currentPath.includes(routePath) ? "activeLi" : "";
    }

    return (
        <React.Fragment>
            <Box
                className={isActive ? "navigation active" : "navigation"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img src={AE} alt="logo" className={isActive ? "companySmallLogo" : "companyLogo"} />
                {/* <span className="companyTitle">{isActive ? "AS" : "Ashok Enterprises"}</span> */}
                <ul>
                    {
                        PAGES.map((page, index) => (
                            <li
                                key={index}
                                onClick={onClick}
                            >
                                {
                                    page.children ?
                                    <>
                                        <Box
                                            className={`${openDropdown === index ? "open" : ""}`}
                                            onClick={(e) => toggleDropdown(e, index)}
                                            sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                }}
                                        >
                                            <Box className="dropdownTitle">
                                                <span className="icon"><page.icon /></span>
                                                <span className="title">{page.title}</span>
                                            </Box>
                                            <Box
                                                sx={{
                                                    color: "white"
                                                }}
                                            >
                                                <span className="arrow">{openDropdown === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
                                            </Box>
                                        </Box>
                                        {openDropdown === index && (
                                                <ul className={`dropdownList submenu ${openDropdown === index ? "openDropdown" : ""}`}>
                                                    {page.children.map((child, cIndex) => (
                                                    <li
                                                        key={cIndex}
                                                        onClick={onClick}
                                                        className={` submenu-item ${getActiveClass(pathname, child.path)}`}

                                                    >
                                                        <Link
                                                            to={child.path}
                                                        >
                                                        <span className="title">{child.title}</span>
                                                        </Link>
                                                    </li>
                                                    ))}
                                                </ul>
                                            )}
                                    </>
                                    :
                                    <Link
                                        to={page.path}
                                        className={getActiveClass(pathname, page.path, page.isExactRoute)}
                                    >
                                        <span className="icon">
                                            <page.icon />
                                        </span>
                                        <span className="title">{page.title}</span>
                                    </Link>
                                }

                            </li>
                        ))
                    }
                </ul>
                 <Box
                sx={{
                    position: "absolute",
                    color: "white",
                    bottom: 30,
                    width: "100%",
                }}
            >
                <li
                    onClick={handleLogout}
                    className="logout"
                >
                    <span className="icon"><LogoutOutlinedIcon /></span>
                    <span className="title">Logout</span>
                </li>
            </Box>
            </Box>
            {/* logout LI at the bottom  */}

        </React.Fragment>
    );
};

SideBar.propTypes = {
    isActive: PropTypes.bool,
    toggleNavigation: PropTypes.func
}

export default SideBar;
