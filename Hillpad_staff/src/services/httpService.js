import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        // Log error with a logger
        console.log("UNEXPECTED ERROR:", error);
    }
    
    return Promise.reject(error);
});

axios.defaults.withCredentials = true;

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
}