import React from 'react';

import MyButton from '../../components/MyButton';
import MySelect from '../../components/MySelect';

import * as S from './style';
import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard } from './helper';

export default ({ type, handleSubmit, handleClose, order, addressList }) => {
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd><br /></React.Fragment>]
        }, [])
    }

    switch (type) {
        case 'aboutOrder':
            return (
                <>
                    <S.WrapperDescriptionList>
                        <h4>Produtos</h4>
                        {order.merchandise.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                        <h4>Endereço de entrega</h4>
                        {createDescriptionsList(addressListDescriptionHelper, order.address.delivery)}
                        <h4>Cartões</h4>
                        {order.card.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        {!!order.cupons.length && <h4>Cupons</h4>}
                        {order.cupons.map(c => <span key={c}>{c + '  '}</span>)}
                    </S.WrapperDescriptionList>
                    <S.ModalFooter>
                        <S.BillingAdrressWrapper>
                            <MySelect className="select-billing-address" handleChange={e => {debugger}} placeholder="usar endereço de entrega para cobrança">
                                <>
                                    <span data-value="">usar endereço de entrega para cobrança</span>
                                    {addressList.map(({ addressLabel, publicPlaceType, publicPlaceName, id }) => {
                                        const text = `${addressLabel} - ${publicPlaceType} ${publicPlaceName}`;
                                        return <span data-value={id} key={id}>{text}</span>
                                    })}
                                </>
                            </MySelect>
                        </S.BillingAdrressWrapper>
                        <MyButton onClick={() => handleClose()}>Cancelar</MyButton>
                        <MyButton onClick={handleSubmit}>Confirmar</MyButton>
                    </S.ModalFooter>
                </>
            );
    
        default:
            return null;
    }
}
