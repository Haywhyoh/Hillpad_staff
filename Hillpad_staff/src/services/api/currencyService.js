import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/academics/currency`;


function getCurrencies() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getCurrency(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}

function createCurrency(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateCurrency(id, data) {
    const url = `${apiEndPoint}/update/${id}`;
    return http.patch(url, data);
}


export default {
    getCurrencies,
    getCurrency,
    createCurrency,
    updateCurrency
}