import http from "../httpService";
import config from "../../config";

const apiEndPoint = `${config.apiBaseURL}/stats`;

function getAccountEntriesStats(metrics, date="") {
    const data = {
        "metrics": metrics
    }
    if (date) {
        data.date = date;
    }
    const url = `${apiEndPoint}/entries`;
    return http.post(url, data);
}

export default {
    getAccountEntriesStats,
};