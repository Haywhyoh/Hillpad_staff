import React, { useState } from "react";
import Cookies from "js-cookie";
import userService from "../services/api/userService";

const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    let [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: ""
    });
    let [loginError, setLoginError] = useState(null);
  
    let login = async (data, callback) => {

        try {
            const response = await userService.login(data);
            if (response.status === 200) {
                const { data } = await userService.getUser();
                setUser(data);
                // const token = response.data["access"];
                Cookies.set('hillpad_user', JSON.stringify(data), { expires: 7 });
                callback();
            } else {
                throw "Unknown error";
            }
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
  
    let value = { user, setUser, loginError, login };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }


export default AuthContext;
