import React, { useState } from "react";
import userService from "../services/api/userService";

const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    let [user, setUser] = useState(null);
    let [loginError, setLoginError] = useState(null);
  
    let login = async (data, callback) => {

        try {
            const user = await userService.login(data);
            setUser({ user });
            callback();
        } catch (ex) {
            if (ex.response.status === 400 || ex.response.status === 401) {
                const loginError = {message: "Incorrect email and/or password provided."};
                setLoginError(loginError);
            }
            else {
                console.error(ex);
            }
        }
    };
  
    let value = { user, loginError, login };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }


export default AuthContext;
