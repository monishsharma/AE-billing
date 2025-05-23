import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import { isMobileDevice } from "../../../helpers/is-mobile-device";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/auth/action';
import AE from "../../../assets/logo.png"

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

    return (
        <React.Fragment>
            <div className={isActive ? "navigation active" : "navigation"}>
                <Link to="/" style={{textDecoration: "none"}}>
                    <img src={AE} alt="logo" className="companyTitle" />
                    {/* <span className="companyTitle">{isActive ? "AS" : "Ashok Enterprises"}</span> */}
                </Link>
                <ul>
                    <li className={pathname === "/" ? "activeLi" : ""} onClick={onClick}>
                        <Link to="/">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li className={pathname.includes("/invoice") ? "activeLi" : ""} onClick={onClick}>
                        <Link to="/invoice">
                            <span className="icon">
                                <ion-icon name="grid-outline"></ion-icon>
                            </span>
                            <span className="title">Invoice</span>
                        </Link>
                    </li>
                    <li className={pathname.includes("/vendor") ? "activeLi" : ""} onClick={onClick}>
                        <Link to="/vendors">
                            <span className="icon">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span className="title">Vendors</span>
                        </Link>
                    </li>
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
