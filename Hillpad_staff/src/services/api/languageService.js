import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/academics/language`;


function getLanguages() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getLanguage(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

function createLanguage(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateLanguage(id, data) {
    const url = `${apiEndPoint}/update/${id}`;
    return http.patch(url, data);
}


export default {
    getLanguages,
    getLanguage,
    createLanguage,
    updateLanguage
}