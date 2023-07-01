import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = `${config.apiURL}/academics/school`;

function getSchools() {
    const url = `${apiEndPoint}/list`;
    return http.get(url);
}


export default {
    getSchools,
}