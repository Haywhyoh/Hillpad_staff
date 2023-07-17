import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/school`;

// School routes
function getSchools(query="") {
    const url = `${apiEndPoint}/list?${query}`;
    return http.get(url);
}

function getSchool(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// School Draft routes
function getSchoolDrafts(query="") {
    const url = `${apiEndPoint}/list_draft?${query}`;
    return http.get(url);
}

function getSchoolDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createSchoolDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateSchoolDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitSchoolDraft(id, data) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function rejectSchoolDraft(id, data) {
    const url = `${apiEndPoint}/reject_draft/${id}`;
    return http.put(url, data);
}

function approveSchoolDraft(id) {
    const url = `${apiEndPoint}/approve_draft/${id}`;
    return http.put(url);
}

function publishSchoolDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}


export default {
    getSchools,
    getSchool,
    getSchoolDrafts,
    getSchoolDraft,
    createSchoolDraft,
    updateSchoolDraft,
    submitSchoolDraft,
    rejectSchoolDraft,
    approveSchoolDraft,
    publishSchoolDraft
}