import axios from 'axios';
import { PROFILE_CUSTOMER_DATA } from '../utils/data/constants';

export const apiUrl = 'https://localhost:5001/v1';

const getJwtToken = () => {
    const storageProfile = JSON.parse(window.sessionStorage.getItem(PROFILE_CUSTOMER_DATA));
    return storageProfile?.constructor.name === 'Object' ? storageProfile.token || '' : '';
}

export const defaultHeader = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJwtToken()}`
    }
});

export const genericPost = (data, endpoint) => {
    return axios.post(`${apiUrl}${endpoint}`, data, defaultHeader());
}

export const genericGet = endpoint => {
    return axios.get(`${apiUrl}${endpoint}`, defaultHeader());
}

export const genericPut = (data, endpoint) => {
    return axios.put(`${apiUrl}${endpoint}`, data, defaultHeader());
}

export const genericDelete = endpoint => {
    return axios.delete(`${apiUrl}${endpoint}`, defaultHeader());
}

export const getAllCategories = () => {
    return genericGet('/domain-items/category');
}

export const getAllPriceGroups = () => {
    return genericGet('/domain-items/price-group');
}
