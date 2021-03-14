import { genericGet, genericPut, genericPost, genericDelete } from './constants';

export const saveNewAddress = (data, customerId) => {
    return genericPost({ ...data, customerId},'/address');
}

export const getAllAddressByIdOrIds = async (ids = []) => {
    if (ids.length)
        return Promise.all( ids.map(id =>genericGet(`/address/${id}`)));
}

export const getAllAddress = () => {
    return genericGet('/address');
}

export const updateAddress = data => {
    return genericPut(data,`/address/${data.id}`)
}

export const deleteAddress = id => {
    return genericDelete(`/address/${id}`)
}
