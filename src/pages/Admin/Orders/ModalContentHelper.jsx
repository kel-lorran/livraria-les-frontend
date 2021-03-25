import React from 'react';

import MyButton from '../../../components/MyButton';
import CustomForm from '../../../components/CustomForm';

import * as S from './style';

import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard, inputMapToUpdateStatus } from './helper';

import { updateOrder } from '../../../actions/orderActions';

export default ({ type, handleClose, itemSelected, setShowModal }) => {
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const updateStatusOrdersSubmit = async data => {
        await updateOrder({ ...itemSelected, ...data });
        handleClose(true);
    }

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd></React.Fragment>]
        }, [])
    }

    switch (type) {
        case 'aboutOrder':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        <MyButton onClick={() => setShowModal('updateStatusOrders')}>Alterar Status</MyButton>
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>
                        <h5>Produtos</h5>
                        {itemSelected.merchandise.map(m => createDescriptionsList(productsListDescriptionHelper, m))}
                        <h5>Endereços</h5>
                        {itemSelected.address.map(m => createDescriptionsList(addressListDescriptionHelper, m))}
                        <h5>Cartoes</h5>
                        {itemSelected.card.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        <h5>Cupons</h5>
                        {itemSelected.cupons.map(c => <span key={c}>{c + '  '}</span>)}
                    </S.WrapperDescriptionList>
                </>
            );
        case 'updateStatusOrders':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Alterar Status</h3>
                        <h4>Pedido - {`${itemSelected.id} de ${(new Date(itemSelected.date)).toLocaleDateString('pt-BR')}`}</h4>  
                    </S.ModalHeader>
                    <CustomForm s="min-height: 20vh;" inputMap={inputMapToUpdateStatus} submmitButtonText="Alterar"  item={itemSelected} onSubmit={updateStatusOrdersSubmit} />
                </>
            )
        
        default:
            return null;
    }
}
