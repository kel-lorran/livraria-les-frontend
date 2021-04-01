import React, { useState, useMemo } from 'react';

import MyButton from '../../../components/MyButton';
import CustomForm from '../../../components/CustomForm';

import * as S from './style';

import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard, inputMapToSearchOrder, inputMapToUpdateStatus } from './helper';

import { updateOrder, searchOrders, exchangeMerchandiseReceived } from '../../../actions/orderActions';
import { generateCupom } from '../../../actions/cupomActions';

export default ({ type, handleClose, itemSelected, setShowModal, setList, setIsFiltered, isAdminPage }) => {
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const updateStatusOrdersSubmit = async data => {
        await updateOrder({ ...itemSelected, ...data });

        if(data?.status === 'mercadoria devolvida') {
            await exchangeMerchandiseReceived(itemSelected.id);
            await generateCupom(itemSelected.id);
        }
        handleClose(true);
    }

    const searchOrderSubmit = async data => {
        try {
            const search = Object.entries(data).reduce((ac, [key, value], i) => {
                return value ? ac += `&${key}_like=${value}` : ac;
            },`?`);

            const resultSearchList = await searchOrders(search).then(r => r.data);

            setList(resultSearchList);

            setIsFiltered(true);
        } catch (error) {
            window.alert("Falha na pesquisa");
            console.log(error);
        } finally {
            handleClose();
        }
    }
    
    const orderExchangeSubmit = async e => {
        e.preventDefault();
        const inputsCheckeds = [...e.target.querySelectorAll('input')]
            .filter(({ checked }) => checked)

        if(inputsCheckeds.length) {
            const exchangedMerchandise = inputsCheckeds.reduce((ac, { dataset: { merchandiseide: id }}) => {
                if (ac[id]) return {
                    ...ac, [id]: { ...ac[id], quantity: ac[id].quantity + 1 }
                }
                return {
                    ...ac, [id]: { ...itemSelected.merchandise.find(m => m.id == id), quantity: 1, status: 'nao processada' }
                }
            }, {})
            await updateOrder({ ...itemSelected, exchangedMerchandise: Object.values(exchangedMerchandise), status: 'em troca' });
            handleClose(true);
        }
    }

    const approveExchangeSubmit = () => {
        const exchangedMerchandiseUpdated = itemSelected.exchangedMerchandise.map(m => ({ ...m, status: m.status === 'nao processada' ? 'aprovada - aguardando recebimento' : m.status }))
        updateStatusOrdersSubmit({ status: 'troca autorizada', exchangedMerchandise: exchangedMerchandiseUpdated })
    }

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd><br /></React.Fragment>]
        }, [])
    }

    const disableRequiredAttribute = helper => helper.map(step => step.map(e =>  ({ ...e, required: false })));

    const makeListWithCheckBox = order => {
        const preparedToList = order.merchandise
            .reduce((ac, { quantity, ...m }) => [...ac, ...Array(+quantity).fill(m)], []);
        return preparedToList.map((m) => {
            const key = Math.random().toFixed(2);
            const _id = `check_${key}`;
            return (
                <S.CustomLi key={key}>
                    <input id={_id} data-merchandiseide={m.id} type="checkbox" />
                    <label htmlFor={_id}>{m.book.title}</label>
                </S.CustomLi>
            ) 
        })
    }

    switch (type) {
        case 'aboutOrder':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Informações</h3>
                        {isAdminPage && <MyButton onClick={() => setShowModal('updateStatusOrders')}>Alterar Status</MyButton>}
                        {itemSelected.status === 'entregue' && <MyButton onClick={() => setShowModal('orderExchange')}>Solicitar troca</MyButton>}
                        {isAdminPage && itemSelected.status === 'em troca' && <MyButton onClick={approveExchangeSubmit}>Aprovar Troca</MyButton>}
                    </S.ModalHeader>
                    <S.WrapperDescriptionList>
                        {isAdminPage && itemSelected.status === 'em troca' && (
                            <div className="has-exchanged-merchandise">
                                <h4>Pedido de troca</h4>
                                {itemSelected.exchangedMerchandise.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                            </div>
                        )}
                        <h4>Produtos</h4>
                        {itemSelected.merchandise.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                        <h4>Endereço de entrega</h4>
                        {createDescriptionsList(addressListDescriptionHelper, itemSelected.address.delivery)}
                        <h4>Cartões</h4>
                        {itemSelected.card.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        {!!itemSelected.couponApplied.length && <h4>Cupons</h4>}
                        {itemSelected.couponApplied.map(c => <span key={c}>{c + '  '}</span>)}
                        {itemSelected && <h4>Total: {itemSelected.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>}
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
                    <CustomForm inputMap={inputMapToUpdateStatus} submmitButtonText="Alterar"  item={itemSelected} onSubmit={updateStatusOrdersSubmit} />
                </>
            )
        case 'searchOrder':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Pesquisar Pedido</h3>
                    </S.ModalHeader>
                    <CustomForm inputMap={inputMapToSearchOrder} submmitButtonText="Pesquisar" onSubmit={searchOrderSubmit} />
                </>
            )

        case 'orderExchange':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Trocar Produto</h3>
                    </S.ModalHeader>
                    <form onSubmit={orderExchangeSubmit}>
                        <ul>
                            {makeListWithCheckBox(itemSelected)}
                        </ul>
                        <S.ModalFooter>
                            <MyButton onClick={() => handleClose()}>Cancelar</MyButton>
                            <MyButton type="submit">Confirmar</MyButton>
                        </S.ModalFooter>
                    </form>
                </>
            )
        
        default:
            return null;
    }
}
