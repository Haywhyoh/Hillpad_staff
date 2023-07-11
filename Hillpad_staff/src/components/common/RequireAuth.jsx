// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import userService from "../../services/api/userService";


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

    async function getLoginState() {
        try {
            const response = await userService.loginState();
            if (response.status === 200) {
                return true;
            }
            return false;
        } catch (ex) {
            // console.log(ex);
            return false;
        }
    }
    
    const userData = Cookies.get("hillpad_user");
    if (!userData) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    

     // .then()
    // console.log(loggedIn);
    // if (!auth.user) {
    //     // Redirect them to the /login page, but save the current location they were
    //     // trying to go to when they were redirected. This allows us to send them
    //     // along to that page after they login, which is a nicer user experience
    //     // than dropping them off on the home page.
    //     // let loggedIn = getLoginState();
    //     // if (!loggedIn) {
    //     //     return <Navigate to="/login" state={{ from: location }} replace />;
    //     // }
        
    //     return <Navigate to="/login" state={{ from: location }} replace />;
    //     // try {
    //     //     const { data } = await userService.getUser();
    //     //     auth.setUser(data);
    //     // } catch (ex) {
    //     //     console.log(ex);
    //     //     if (ex.response.status === 400 || ex.response.status === 401 || ex.response.status === 403) {
    //     //     }
    //     // }
    // }
    // return <Navigate to="/login" state={{ from: location }} replace />;

    return children;
}

export default RequireAuth;
