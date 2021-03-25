import { genericPost, genericDelete } from './constants';

export const saveNewCard = (data, customerId) => {
    return genericPost({ ...data, customerId},'/card');
}

export const deleteCard = id => {
    return genericDelete(`/card/${id}`)
}
