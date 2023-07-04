import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/degree_type`;

function getDegreeTypes() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getDegreeType(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

function createDegreeType(data) {
    const url = `${apiEndPoint}/create`;
    return http.post(url, data);
}

function updateDegreeType(id, data) {
    const url = `${apiEndPoint}/update/${id}`;
    return http.patch(url, data);
}


export default {
    getDegreeTypes,
    getDegreeType,
    createDegreeType,
    updateDegreeType
}