import { genericPost, genericGet, genericPut } from './constants';

export const saveNewOrder = data => {
    return genericPost(data, '/order');
}

export const getAllOrders = () => {
    return genericGet('/order');
}

export const updateOrder = data => {
    return genericPut(data,`/order/${data.id}`);
}
