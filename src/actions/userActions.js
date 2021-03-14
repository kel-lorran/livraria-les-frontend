import { genericGet, genericPut, genericPost, genericDelete } from './constants';

export const login = (email, password) => {
    return genericGet(`/user?email=${email}&password=${password}`);
}
