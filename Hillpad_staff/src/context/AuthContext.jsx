import React, { useState } from "react";
import Cookies from "js-cookie";
import userService from "../services/api/userService";
import config from "../config";

const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    let [user, setUser] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        role: ""
    });
    let [loginError, setLoginError] = useState(null);
    let [loading, setLoading] = useState(false);

    const userCookie = config.userCookie;
  
    let login = async (data, callback) => {

        try {
            setLoading(true);
            const response = await userService.login(data);
            if (response.status === 200) {
                const { data } = await userService.getUser();
                setUser(data);
                // remove id field
                // const token = response.data["access"];
                Cookies.set(userCookie, JSON.stringify(data), { expires: 7 });
                setLoading(false);
                callback();
            } else {
                setLoading(false);
                throw "Error: " + response.status;
            }
        } catch (ex) {
            if (ex.response.status === 400 || ex.response.status === 401) {
                const loginError = {message: "Incorrect email and/or password provided."};
                setLoginError(loginError);
                setLoading(false);
            }
            else {
                console.error(ex);
                setLoading(false);
            }
        }
    };

    let logout = async (callback) => {
        const userCookie = config.userCookie;

        try {
            setLoading(true);
            const response = await userService.logout();
            if (response.status === 200) {
                if (Cookies.get(userCookie)) {
                    Cookies.remove(userCookie);
                    setLoading(false);
                    callback();
                }
            } else {
                setLoading(false);
                throw "Error: " + response.status;
            }
        } catch (ex) {
            console.log(ex);
            setLoading(false);
        }
    }
  
    let value = { user, setUser, loginError, setLoginError, login, logout, loading };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }


export default AuthContext;
