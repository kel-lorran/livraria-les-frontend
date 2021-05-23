import { genericPost, genericGet, genericPut } from './constants';

export const getAllCupons = async () => {
    return genericGet('/coupon');
}
