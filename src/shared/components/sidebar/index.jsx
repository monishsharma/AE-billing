import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { isMobileDevice } from "../../../helpers/is-mobile-device";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/auth/action';
import AE from "../../../assets/logo.png"
import { ROUTES } from "./selector";

const SideBar = ({
    isActive,
    toggleNavigation
}) => {
    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();

    const onClick = () => {
        if (isMobileDevice()) {
            toggleNavigation(true)
        }
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const getActiveClass = (currentPath, routePath, isExactRoute = false) => {
        if (isExactRoute) {
            return currentPath === routePath ? "activeLi" : "";
        }
        return currentPath.includes(routePath) ? "activeLi" : "";
    }

    return (
        <React.Fragment>
            <div className={isActive ? "navigation active" : "navigation"}>
                <Link to="/" style={{textDecoration: "none"}}>
                    <img src={AE} alt="logo" className="companyTitle" />
                    {/* <span className="companyTitle">{isActive ? "AS" : "Ashok Enterprises"}</span> */}
                </Link>
                <ul>
                    {
                        ROUTES.map((route, index) => (
                            <li
                                key={index}
                                className={getActiveClass(pathname, route.path, route.isExactRoute)}
                                onClick={onClick}
                            >
                                <Link to={route.path}>
                                    <span className="icon">
                                        <ion-icon name={route.icon}></ion-icon>
                                    </span>
                                    <span className="title">{route.title}</span>
                                </Link>
                            </li>
                        ))
                    }
                    <li onClick={handleLogout}>
                        <a style={{cursor: "pointer", color: "white"}}>
                            <span className="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </span>
                            <span className="title">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};

SideBar.propTypes = {
    isActive: PropTypes.bool,
    toggleNavigation: PropTypes.func
}

export default SideBar;
