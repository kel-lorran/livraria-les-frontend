import { genericPost, genericGet, genericPut } from './constants';
import { saveNewAddress } from './addressActions';

export const saveNewCustomer = async (dataCustomer, dataAddress) => {
    const customerId = await genericPost(dataCustomer,'/customer').then(r => r.data.id);
    return Promise.all(dataAddress.map(a => saveNewAddress(a, customerId)));
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
    return genericPut(data,`/customer/${data.id}`)
}
