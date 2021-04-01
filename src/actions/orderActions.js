import { genericPost, genericGet, genericPut } from './constants';

export const saveNewOrder = data => {
    return genericPost(data, '/order');
}

export const getAllOrders = () => {
    if(/admin/g.test(window.location.pathname))
        return genericGet('/order');
    const storageProfileJson = window?.sessionStorage.getItem('profileCustomerData') || 'null';
    const dataProfile = JSON.parse(storageProfileJson);
    return genericGet(`/order?customer.email=${dataProfile.email}`);
}

export const updateOrder = data => {
    return genericPut(data,`/order/${data.id}`);
}

export const searchOrders = search => {
    return genericGet(`/order${search}`)
}

export const exchangeMerchandiseReceived = async id => {
    const orderToUpdate = await genericGet(`/order/${id}`).then(r => r.data);
    const exchangedMerchandiseUpdated = orderToUpdate.exchangedMerchandise.map(m => ({ ...m, status: m.status === 'aprovada - aguardando recebimento' ? 'finalizada' : m.status }))
    await genericPut({ ...orderToUpdate, status: 'mercadoria devolvida', exchangedMerchandise: exchangedMerchandiseUpdated },`/order/${id}`);
}
