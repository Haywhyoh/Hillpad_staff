import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/degree_type`;

// Degree Type routes
function getDegreeTypes() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getDegreeType(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// Degree Type Draft routes
function getDegreeTypeDrafts() {
    const url = `${apiEndPoint}/list_draft`;
    return http.get(url);
}

function getDegreeTypeDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createDegreeTypeDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateDegreeTypeDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitDegreeTypeDraft(id, data) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function publishDegreeTypeDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}

export default {
    getDegreeTypes,
    getDegreeType,
    getDegreeTypeDrafts,
    getDegreeTypeDraft,
    createDegreeTypeDraft,
    updateDegreeTypeDraft,
    submitDegreeTypeDraft,
    publishDegreeTypeDraft
}