import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthState } from '../store/auth/action';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;