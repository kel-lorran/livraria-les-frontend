import { genericPost, genericGet, genericPut } from './constants';

export const saveNewBook = data => {
    return genericPost(data,'/product');
}

export const getAllBooks = () => {
    return genericGet('/product/active');
}

export const getBookById = id => {
    return genericGet(`/book/${id}`);
}

export const getAllBooksInactives = () => {
    return genericGet('/product/inactive');
}

export const searchBooks = search => {
    return genericGet(`/book${search}`);
}

export const updateBook = data => {
    return genericPut(data,`/book/${data.id}`);
}
