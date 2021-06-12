import { genericGet, genericPut, genericPost, genericDelete } from './constants';

export const login = data => {
    return genericPost(data, '/user/login');
}

// export const saveNewUser = data => {
//     return genericPost(data, '/user');
// }

export const deleteUser =  data => {
    return genericDelete('/user');
}
