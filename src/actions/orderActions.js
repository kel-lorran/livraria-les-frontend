import { genericPost } from './constants';

export const saveNewOrder = data => {
    return genericPost(data, '/order');
}
