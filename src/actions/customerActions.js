import { genericPost, genericGet, genericPut } from './constants';

export const saveNewCustomer = async dataCustomer => {
    return genericPost(dataCustomer,'/customer');
}

export const getCustomerById = id => {
    return genericGet(`/customer/${id}`);
}

export const getAllCustomersActives = () => {
    return genericGet('/customer/search?active=1')
}

export const getAllCustomersInactives = () => {
    return genericGet('/customer/search?active=0')
}

export const searchCustomers = search => {
    return genericGet(`/customer${search}`)
}

export const updateCustomer = data => {
    return genericPut(data,`/customer/person-data`)
}

export const getFullProfile = () => {
    return genericGet(`/customer/own-profile`);
}

export const updateStatusCustomer = ({ active, inativationMessage, id }) => {
    return genericPut({ active, inativationMessage },`/customer/status/${id}`);
}
