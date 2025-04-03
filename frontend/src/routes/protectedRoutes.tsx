import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/userContext';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return <div className=' h-screen w-full flex items-center justify-center'>Loading...</div>;
    }

    return user ? (
        <>{children}</>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default ProtectedRoutes;
