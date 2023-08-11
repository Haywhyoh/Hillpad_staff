import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/academics/programme_type`;

function getProgrammeTypes() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getProgrammeType(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

function createProgrammeType(data) {
    const url = `${apiEndPoint}/create`;
    return http.post(url, data);
}

function updateProgrammeType(id, data) {
    const url = `${apiEndPoint}/update/${id}`;
    return http.patch(url, data);
}


export default {
    getProgrammeTypes,
    getProgrammeType,
    createProgrammeType,
    updateProgrammeType
}