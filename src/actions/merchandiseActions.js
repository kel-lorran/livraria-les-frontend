import { genericPost, genericGet, genericPut } from './constants';
import { getBookById, updateBook } from './bookActions'

export const getAllMerchandise = () => {
    return genericGet('/merchandise/active');
}

export const getMerchandiseById = id => {
    return genericGet(`/merchandise/${id}`)
}

export const incrementStock = payload => {
    return genericPost(payload, '/merchandise/increment')
}

export const decrementStock = payload => {
    return genericPost(payload, '/merchandise/decrement')
}
