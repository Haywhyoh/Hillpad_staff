import http from "../httpService";
import config from "../../config";


const apiEndPoint = `${config.apiBaseURL}/academics/country`;

// Country routes
function getCountries(query="") {
    const url = `${apiEndPoint}/list?${query}`;
    return http.get(url);
}

function getCountry(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// Country Draft routes
function getCountryDrafts(query="") {
    const url = `${apiEndPoint}/list_draft?${query}`;
    return http.get(url);
}

function getCountryDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createCountryDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateCountryDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitCountryDraft(id, data={}) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function publishCountryDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}

export default {
    getCountries,
    getCountry,
    getCountryDrafts,
    getCountryDraft,
    createCountryDraft,
    updateCountryDraft,
    submitCountryDraft,
    publishCountryDraft
}