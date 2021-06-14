import { genericPost, genericGet, genericPut } from './constants';

export const getAllCupons = async () => {
    return genericGet('/coupon');
}

export const getAllPromotionalCupons = async () => {
    return genericGet('/coupon/search?type=promotional');
}

export const saveNewCoupon = async data => {
    return genericPost(data, '/coupon');
}
