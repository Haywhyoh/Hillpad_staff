import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/account`;


function login(data) {
    const url = `${apiEndPoint}/token`;
    return http.post(url, data);
}

function logout() {
    const url = `${apiEndPoint}/logout`;
    return http.post(url);
}

function loginState() {
    const url = `${apiEndPoint}/login-state`;
    return http.get(url);
}

function getUsers(query="") {
    const url = `${apiEndPoint}/list_staff?${query}`;
    return http.get(url);
}

function getUser() {
    const url = `${apiEndPoint}/detail`;
    return http.get(url);
}

function retrieveUser(id) {
    const url = `${apiEndPoint}/retrieve_staff/${id}`;
    return http.get(url);
}

function createAdmin(data) {
    const url = `${apiEndPoint}/register_admin`;
    return http.post(url, data);
}

function createSupervisor(data) {
    const url = `${apiEndPoint}/register_supervisor`;
    return http.post(url, data);
}

function createSpecialist(data) {
    const url = `${apiEndPoint}/register_specialist`;
    return http.post(url, data);
}

export default {
    login,
    logout,
    loginState,
    getUsers,
    getUser,
    retrieveUser,
    createAdmin,
    createSupervisor,
    createSpecialist,
}