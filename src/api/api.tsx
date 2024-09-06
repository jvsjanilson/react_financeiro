import axios from "axios";

const port: number = 80;

export const BASE_URL = `https://janilsonjvs.pythonanywhere.com${port !== 80 ? ':'+port.toString() : ''}/api/`;
// export const BASE_URL = `http://localhost:${port}/api/`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
        }
        return config;
    }
);

api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;