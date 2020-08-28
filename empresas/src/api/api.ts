import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://empresas.ioasys.com.br/api/v1',
});

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        return Promise.reject(error.response.data);
    }
);