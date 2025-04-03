import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from "../context/userContext";
import { routeConfig } from "./routes.config";
import ProtectedRoutes from "./protectedRoutes";

const AppRoutes: React.FC = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {routeConfig.map(({ path, component: Component, protected: isProtected }, index) =>
                        isProtected ? (
                            <Route key={index} path={path} element={<ProtectedRoutes><Component /></ProtectedRoutes>} />
                        ) : (
                            <Route key={index} path={path} element={<Component />} />
                        )
                    )}
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default AppRoutes;
