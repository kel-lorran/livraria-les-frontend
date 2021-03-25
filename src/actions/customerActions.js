import { genericPost, genericGet, genericPut } from './constants';
import { saveNewAddress } from './addressActions';
import { saveNewUser } from './userActions';

import { PROFILE_CUSTOMER_DATA } from '../utils/data/constants';

export const saveNewCustomer = async ({ passwordRedundancy, password, ...dataCustomer }, dataAddress) => {
    const customerId = await genericPost(dataCustomer,'/customer').then(r => r.data.id);
    await saveNewUser({ password, customerId, email: dataCustomer.email });
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


export const getFullProfile = () => {
    const storageProfileJson = window?.sessionStorage.getItem(PROFILE_CUSTOMER_DATA) || 'null';
    const dataProfile = JSON.parse(storageProfileJson);

    return genericGet(`/customer?_embed=address&_embed=card&active=1&email=${dataProfile?.email}`);
}