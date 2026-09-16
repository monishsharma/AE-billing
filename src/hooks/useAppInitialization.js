import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { checkAuthState } from "../store/auth/action";
import { getAppConfig, getVendorList } from "../store/config/action";

const useAppInitialization = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuthState());
        dispatch(getVendorList());
        dispatch(getAppConfig());
    }, [dispatch]);
};

export default useAppInitialization;