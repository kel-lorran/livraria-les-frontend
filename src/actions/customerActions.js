import { genericPost, genericGet, genericPut } from './constants';

export const saveNewCustomer = async dataCustomer => {
    return genericPost(dataCustomer,'/customer');
}

export const getAllCustomersActives = () => {
    return genericGet('/customer?_embed=address&active=1')
}

export const getAllCustomersInactives = () => {
    return genericGet('/customer?_embed=address&active=0')
}

export const searchCustomers = search => {
    return genericGet(`/customer${search}&_embed=address`)
}

export const updateCustomer = data => {
    return genericPut(data,`/customer/person-data`)
}

export const getFullProfile = () => {
    return genericGet(`/customer/own-profile`);
}
