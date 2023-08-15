import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/academics/currrency`;

// Currency routes
function getCurrencies(query="") {
    const url = `${apiEndPoint}/list?${query}`;
    return http.get(url);
}

function getCurrency(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

// Currency Draft routes
function getCurrencyDrafts(query="") {
    const url = `${apiEndPoint}/list_draft?${query}`;
    return http.get(url);
}

function getCurrencyDraft(id) {
    const url = `${apiEndPoint}/detail_draft/${id}`;
    return http.get(url);
}

function createCurrencyDraft(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateCurrencyDraft(id, data) {
    const url = `${apiEndPoint}/update_draft/${id}`;
    return http.patch(url, data);
}

function submitCurrencyDraft(id, data={}) {
    const url = `${apiEndPoint}/submit_draft/${id}`;
    return http.patch(url, data);
}

function publishCurrencyDraft(id) {
    const url = `${apiEndPoint}/publish_draft/${id}`;
    return http.put(url);
}


export default {
    getCurrencies,
    getCurrency,
    getCurrencyDrafts,
    getCurrencyDraft,
    createCurrencyDraft,
    updateCurrencyDraft,
    submitCurrencyDraft,
    publishCurrencyDraft
}