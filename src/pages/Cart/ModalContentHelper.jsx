import React from 'react';
import MyButton from "../../components/MyButton"

import * as S from './style';
import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard } from './helper';

export default ({ type, handleSubmit, handleClose, order }) => {
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd></React.Fragment>]
        }, [])
    }

    switch (type) {
        case 'aboutOrder':
            return (
                <>
                    <h4>Pedido:</h4>
                    <S.WrapperDescriptionList>
                        <h5>Produtos</h5>
                        {order.merchandise.map(m => createDescriptionsList(productsListDescriptionHelper, m))}
                        <h5>Endereços</h5>
                        {order.address.map(m => createDescriptionsList(addressListDescriptionHelper, m))}
                        <h5>Cartoes</h5>
                        {order.card.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        <h5>Cupons</h5>
                        {order.cupons.map(c => <span key={c}>{c + '  '}</span>)}
                    </S.WrapperDescriptionList>
                    <S.ModalFooter>
                        <MyButton onClick={() => handleClose()}>Cancelar</MyButton>
                        <MyButton onClick={handleSubmit}>Confirmar</MyButton>
                    </S.ModalFooter>
                </>
            );
    
        default:
            return null;
    }
}
