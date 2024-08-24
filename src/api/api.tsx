import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async config => {
    const token = JSON.parse(localStorage.getItem('token') ?? '')?.access ?? '';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        
    }
    return config;
}
);

api.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;