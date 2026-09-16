import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./shared/components/sidebar";
import TopBar from "./components/top-bar";
import useScrollableContainer from "./hooks/useScrollableContainer";
import useScrollRestoration from "./hooks/useScrollRestoration";
import { isMobileDevice } from "./helpers/is-mobile-device";

const AppLayout = () => {
    const [isActive, setIsActive] = useState(isMobileDevice() ? true : false);

    const {
        scrollableDivRef,
        handleScroll,
    } = useScrollableContainer();

    useScrollRestoration();

    const toggleSidebar = () => {
        setIsActive(
            (previous) => !previous
        );
    };

    return (
        <div className="app-layout">
            <SideBar
                isActive={isActive}
                onToggle={toggleSidebar}
            />

            <main
                className={`main ${isActive
                        ? "bigmain active"
                        : "smallmain "
                    }`}
            >
                <TopBar
                    onMenuClick={toggleSidebar}
                />

                <div
                    className="scrollableDiv"
                    ref={scrollableDivRef}
                    onScroll={handleScroll}
                >
                    <Outlet
                        context={{
                            ref: scrollableDivRef,
                            isActive,
                        }}
                    />
                </div>
            </main>
        </div>
    );
};

export default AppLayout;