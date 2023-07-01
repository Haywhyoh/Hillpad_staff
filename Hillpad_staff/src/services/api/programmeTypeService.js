import http from "../httpService";
import config from "../../config.json";

const apiEndPoint = config.apiURL + "/academics/programme_type";

function getProgrammeTypes() {
    return http.get(apiEndPoint + "/list");
}

export default {
    getProgrammeTypes
}