import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/course`;

// Course routes
function getCourses() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getCourse(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// Course Draft routes
function getCourseDrafts() {
    const url = `${apiEndPoint}/list_draft`;
    return http.get(url);
}

function getCourseDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createCourseDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateCourseDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitCourseDraft(id, data) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function rejectCourseDraft(id, data) {
    const url = `${apiEndPoint}/reject_draft/${id}`;
    return http.put(url, data);
}

function approveCourseDraft(id) {
    const url = `${apiEndPoint}/approve_draft/${id}`;
    return http.put(url);
}

function publishCourseDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}


export default {
    getCourses,
    getCourse,
    getCourseDrafts,
    getCourseDraft,
    createCourseDraft,
    updateCourseDraft,
    submitCourseDraft,
    rejectCourseDraft,
    approveCourseDraft,
    publishCourseDraft
}