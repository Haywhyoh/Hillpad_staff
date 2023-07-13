import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/country`;


function getCountries() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}

function getCountry(id) {
    const url = `${apiEndPoint}/detail/${id}`;
    return http.get(url);
}


function createCountry(data) {
    const url = `${apiEndPoint}/create_draft`;
    return http.post(url, data);
}

function updateCountry(id, data) {
    const url = `${apiEndPoint}/update/${id}`;
    return http.patch(url, data);
}



function getCountryDrafts() {
    const url = `${apiEndPoint}/list_draft`;
    return http.get(url);
}

export default {
    getCountries,
    getCountry,
    createCountry,
    updateCountry,
    getCountryDrafts
}