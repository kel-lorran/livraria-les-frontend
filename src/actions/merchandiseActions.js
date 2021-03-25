import { genericPost, genericGet, genericPut } from './constants';
import { getBookById, updateBook } from './bookActions'

export const getAllMerchandise = async () => {
    return genericGet('/merchandise?_embed=book&active=1');
}

export const getMerchandiseById = async id => {
    return genericGet(`/merchandise/${id}?_embed=book`)
}

export const getMerchandiseWithoutBookById = async id => {
    try {
        return await genericGet(`/merchandise/${id}`);
    } catch(error) {
        return { data: {}}
    }
}

export const incrementStock = async payload => {
    const id = payload?.book?.[0] || payload.bookId;
    const { price, quantity} = await getMerchandiseWithoutBookById(id).then(r => r.data);
    const oldPrice = Number(price);
    const oldQuantity = Number(quantity);

    if(oldPrice || oldQuantity) {
        return genericPut({
            id,
            price: ((oldPrice * oldQuantity) + (+payload.price * +payload.quantity)) / (oldQuantity + +payload.quantity),
            quantity: (oldQuantity + +payload.quantity)
        },`/merchandise/${id}`);
    } else {
        await genericPost({
            id,
            price: (+payload.price * +payload.quantity) / +payload.quantity,
            quantity: +payload.quantity
        },`/merchandise`);
        const book = await getBookById(id).then(r => r.data);
        return updateBook({ ...book, merchandiseId: id }, `/merchandise/${id}`)
    }
}

export const decrementStock = async (id, decrement) => {
    const { price, quantity} = await getMerchandiseWithoutBookById(id).then(r => r.data);
    const oldPrice = Number(price);
    const oldQuantity = Number(quantity);

    return genericPut({
        id,
        price: oldPrice,
        quantity: (oldQuantity - decrement)
    },`/merchandise/${id}`);
}
