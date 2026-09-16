import { useEffect } from "react";

const useScrollRestoration = () => {
    useEffect(() => {
        if (!("scrollRestoration" in window.history)) return;

        window.history.scrollRestoration = "manual";

        return () => {
            window.history.scrollRestoration = "auto";
        };
    }, []);
};

export default useScrollRestoration;