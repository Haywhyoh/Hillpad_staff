import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/stats`;

function getAccountEntriesStats(metrics) {
    const data = {
        "metrics": metrics
    }
    const url = `${apiEndPoint}/entries`;
    return http.post(url, data);
}

export default {
    getAccountEntriesStats,
};