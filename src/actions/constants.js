import axios from 'axios';

export const apiUrl = 'http://localhost:3004';

export const defaultHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const genericPost = (data, endpoint) => {
    return axios.post(`${apiUrl}${endpoint}`, data, defaultHeader);
}

export const genericGet = endpoint => {
    return axios.get(`${apiUrl}${endpoint}`);
}

export const genericPut = (data, endpoint) => {
    return axios.put(`${apiUrl}${endpoint}`, data, defaultHeader);
}

export const genericDelete = endpoint => {
    return axios.delete(`${apiUrl}${endpoint}`, defaultHeader);
}
