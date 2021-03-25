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
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd><br /></React.Fragment>]
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
                        <h4>Produtos</h4>
                        {itemSelected.merchandise.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                        <h4>Endereço de entrega</h4>
                        {createDescriptionsList(addressListDescriptionHelper, itemSelected.address.delivery)}
                        <h4>Cartões</h4>
                        {itemSelected.card.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        {!!itemSelected.cupons.length && <h4>Cupons</h4>}
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
