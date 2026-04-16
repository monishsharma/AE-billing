import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuthState } from '../store/auth/action';
import { CircularProgress, Box } from '@mui/material';

const PublicRoute = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthState());
            setIsChecking(false);
        };
        checkAuth();
    }, [dispatch]);

    if (isChecking || loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'white'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard/ASHOK" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;