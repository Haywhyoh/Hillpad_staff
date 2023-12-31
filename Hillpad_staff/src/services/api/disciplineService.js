import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/academics/discipline`;

// Discipline routes
function getDisciplines(query="") {
    const url = `${apiEndPoint}/list?${query}`;
    return http.get(url);
}

function getDiscipline(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// Discipline Draft routes
function getDisciplineDrafts(query="") {
    const url = `${apiEndPoint}/list_draft?${query}`;
    return http.get(url);
}

function getDisciplineDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createDisciplineDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateDisciplineDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitDisciplineDraft(id, data={}) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function publishDisciplineDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}


export default {
    getDisciplines,
    getDiscipline,
    getDisciplineDrafts,
    getDisciplineDraft,
    createDisciplineDraft,
    updateDisciplineDraft,
    submitDisciplineDraft,
    publishDisciplineDraft
}