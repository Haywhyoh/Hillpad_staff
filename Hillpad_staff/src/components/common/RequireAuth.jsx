import { useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";


const RequireAuth = ({ children }) => {
    // 1. Check if user object is set
    // 2. If set, allow
    // 3. If not set, call API to set user object
    // 4. If API 400, 401, 403, navigate to login
    
    let auth = useAuth();
    let location = useLocation();
    
    useEffect(() => {
        const userData = Cookies.get("hillpad_user");
        if (userData && JSON.parse(userData)) {
            auth.setUser(JSON.parse(userData));
        }
      }, []);
    
    const userData = Cookies.get("hillpad_user");
    if (!userData) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
