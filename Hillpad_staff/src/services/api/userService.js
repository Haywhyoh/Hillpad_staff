import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/account`;

// School routes
function login(data) {
    const url = `${apiEndPoint}/token`;
    return http.post(url, data);
}

function logout() {
    const url = `${apiEndPoint}/logout`;
    return http.post(url);
}

// School Draft routes
function getUser() {
    const url = `${apiEndPoint}/detail`;
    return http.get(url);
}


export default {
    login,
    logout,
    getUser
}