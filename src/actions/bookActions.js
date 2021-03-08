import { genericPost, genericGet } from './constants';

export const saveNewBook = data => {
    return genericPost(data,'/book');
}

export const getAllBooksActives = () => {
    return genericGet('/book?active=true')
}

export const getAllBooksInactives = () => {
    return genericGet('/book?active=false')
}
