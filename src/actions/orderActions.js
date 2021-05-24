import { genericPost, genericGet, genericPut } from './constants';

import { TIMER_EXPIRE_CART_KEY, TIMER_EXPIRE_CART_INITIAL } from '../utils/data/constants';

export const saveNewDraftOrder = data => {
    window.sessionStorage.setItem(TIMER_EXPIRE_CART_KEY, TIMER_EXPIRE_CART_INITIAL);
    return genericPost(data, '/order/draft');
}

export const saveNewOrder = data => {
    return genericPost(data, '/order');
}

export const commitOrder = data => {
    return genericPut(data, '/order');
}

export const updateDraftOrder = data => {
    window.sessionStorage.setItem(TIMER_EXPIRE_CART_KEY, TIMER_EXPIRE_CART_INITIAL);
    return genericPut(data, '/order/draft');
}

export const getOrderById = id => {
    return genericGet(`/order/draft/${id}`);
}

export const getAllOrders = () => {
    return genericGet('/order');
}

export const updateOrderStatus = data => {
    return genericPut(data,'/order/status');
}

export const searchOrders = search => {
    return genericGet(`/order/search${search}`)
}

export const updateOrderExchangeMerchandise = data => {
    return genericPut(data,'/order/exchange');
}
