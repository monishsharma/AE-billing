import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

const PublicRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

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

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;