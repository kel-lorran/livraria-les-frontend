import axios from 'axios';

export const apiUrl = 'http://localhost:3004';

export const defaultHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const genericPost = async (data, endpoint) => {
    return await axios.post(`${apiUrl}${endpoint}`, data, defaultHeader);
}

export const genericGet = async endpoint => {
    return await axios.get(`${apiUrl}${endpoint}`);
}
