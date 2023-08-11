import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/account`;

// School routes
function login(data) {
    const url = `${apiEndPoint}/token`;
    return http.post(url, data);
}

function logout() {
    const url = `${apiEndPoint}/logout`;
    return http.post(url);
}

function getUser() {
    const url = `${apiEndPoint}/detail`;
    return http.get(url);
}


function loginState() {
    const url = `${apiEndPoint}/login-state`;
    return http.get(url);
}

export default {
    login,
    logout,
    getUser,
    loginState
}