// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({ user }) => {

    return user ? <Outlet /> : <Navigate to="/login" />
    
}

export default ProtectedRoute;
