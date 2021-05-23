import React, { useState, useEffect } from 'react';

import MyButton from '../../components/MyButton';
import MySelect from '../../components/MySelect';

import { abbreviateText } from '../../utils'

import * as S from './style';
import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard } from './helper';

export default ({ type, handleSubmit, handleClose, order, addressList, setOrder }) => {
    const [billingAddress, setBillingAddress] = useState();
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd><br /></React.Fragment>]
        }, [])
    }

    const changeAddress = ({ target: { value }}) => {
        value && setBillingAddress(addressList.filter(({id}) => value == id)[0])
         setOrder({ ...order, deliveryAddress: order.deliveryAddress, billingAddress: addressList.filter(({id}) => value == id)[0] })
    }

    useEffect(
        () => billingAddress && setOrder({ ...order, deliveryAddress: order.deliveryAddress, billingAddress }),
        [billingAddress]
    )

    switch (type) {
        case 'aboutOrder':
            return (
                <>
                    <S.WrapperDescriptionList>
                        <h4>Produtos</h4>
                        {order.merchandiseList.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                        <h4>Endereço de entrega</h4>
                        {createDescriptionsList(addressListDescriptionHelper, order.deliveryAddress)}
                        <h4>Cartões</h4>
                        {order.creditCardList.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        {!!order.couponAppliedList.length && <h4>Cupons</h4>}
                        {order.couponAppliedList.map(c => <span key={c.code}>{c.code + '  '}</span>)}
                        {order?.subTotal && <h5>Subtotal: {order.subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>}
                        {!!order?.discount && <h5>Desconto: {(order.discount * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>}
                        {order && <h4>Total: {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>}
                    </S.WrapperDescriptionList>
                    <S.ModalFooter>
                        <S.BillingAdrressWrapper>
                            <MySelect className="select-billing-address" handleChange={changeAddress} placeholder="usar endereço de entrega para cobrança" value={billingAddress?.id}>
                                <>
                                    <span data-value="">usar endereço de entrega para cobrança</span>
                                    {addressList.map(({ addressLabel, publicPlaceType, publicPlaceName, id }) => {
                                        const text = `usar ${abbreviateText(addressLabel, 12)} - ${abbreviateText(`${publicPlaceType} ${publicPlaceName}`, 12)} para cobrança`;
                                        return <span title={`usar ${addressLabel} - ${publicPlaceType} ${publicPlaceName} para cobrança`} data-value={id} key={id}>{text}</span>
                                    })}
                                </>
                            </MySelect>
                        </S.BillingAdrressWrapper>
                        <MyButton onClick={() => handleClose()}>Editar</MyButton>
                        <MyButton onClick={handleSubmit}>Confirmar</MyButton>
                    </S.ModalFooter>
                </>
            );
    
        default:
            return null;
    }
}
