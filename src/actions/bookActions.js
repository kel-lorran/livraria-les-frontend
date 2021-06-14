import { genericPost, genericGet, genericPut } from './constants';

export const saveNewBook = data => {
    return genericPost(data,'/product');
}

export const getAllBooks = () => {
    return genericGet('/product/active');
}

export const getBookById = id => {
    return genericGet(`/product/${id}`);
}

export const getAllBooksInactives = () => {
    return genericGet('/product/inactive');
}

export const searchBooks = search => {
    return genericGet(`/product/search${search}`);
}

export const updateStatusBook = ({ active, inativationMessage, id }) => {
    return genericPut({ active, inativationMessage },`/product/status/${id}`);
}

export const updateBook = data => {
    return genericPut(data,`/product/${data.id}`);
}
