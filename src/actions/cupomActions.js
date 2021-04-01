import { genericPost, genericGet, genericPut } from './constants';

export const generateCupom = async orderId => {
    const order = await genericGet(`/order/${orderId}`).then(r => r.data);
    const value = order.exchangedMerchandise.reduce((ac, m) => m.status === 'finalizada' ? ac + (m.quantity * m.price) : ac, 0)
    if(value) {
        genericPost({
            value,
            code: (Math.random() * 1000000000).toFixed(),
            orderId,
            customerId: order.customer.id,
            customerEmail: order.customer.email,
            status: 'disponivel' 
        }, '/cupom')
    }
}

export const getAllCupons = async () => {
    if(/admin/g.test(window.location.pathname))
        return genericGet('/cupom');
    const storageProfileJson = window?.sessionStorage.getItem('profileCustomerData') || 'null';
    const dataProfile = JSON.parse(storageProfileJson);
    return genericGet(`/cupom?customerEmail=${dataProfile.email}`);
}

export const getCuponsDiscount = async cuponsCodes => {
    const storageProfileJson = window?.sessionStorage.getItem('profileCustomerData') || 'null';
    const dataProfile = JSON.parse(storageProfileJson);
    const cupons = await Promise.all(cuponsCodes.map(c => genericGet(`/cupom?customerEmail=${dataProfile.email}&code=${c}`).then(r => r.data)))
    let discount = 0;
    cupons.forEach(arr => arr.forEach(c => discount += c.value))
    return discount;
}
