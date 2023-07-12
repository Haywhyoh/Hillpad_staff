import React, { useState } from "react";
import Cookies from "js-cookie";
import userService from "../services/api/userService";
import config from "../config.json";

const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    let [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: ""
    });
    let [loginError, setLoginError] = useState(null);

    const userCookie = config.userCookie;
  
    let login = async (data, callback) => {

        try {
            const response = await userService.login(data);
            if (response.status === 200) {
                const { data } = await userService.getUser();
                setUser(data);
                // const token = response.data["access"];
                Cookies.set(userCookie, JSON.stringify(data), { expires: 7 });
                callback();
            } else {
                throw "Error: " + response.status;
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

    let logout = async (callback) => {
        const userCookie = config.userCookie;

        try {
            const response = await userService.logout();
            if (response.status === 200) {
                if (Cookies.get(userCookie)) {
                    Cookies.remove(userCookie);
                    callback();
                }
            } else {
                throw "Error: " + response.status;
            }
        } catch (ex) {
            console.log(ex);
        }
    }
  
    let value = { user, setUser, loginError, login, logout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }


export default AuthContext;
