import React, { useState, useMemo } from 'react';

import MyButton from '../../../components/MyButton';
import CustomForm from '../../../components/CustomForm';

import * as S from './style';

import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard, inputMapToSearchOrder, inputMapToUpdateStatus } from './helper';

import { updateOrderStatus, searchOrders, updateOrderExchangeMerchandise, getOrderById } from '../../../actions/orderActions';

export default ({ type, handleClose, itemSelected, setShowModal, setList, setIsFiltered, isAdminPage }) => {
    const productsListDescriptionHelper = tableOptionsProducts.showElements;
    const addressListDescriptionHelper = tableOptionsAddress.showElements;
    const cardListDescriptionHelper = tableOptionsCard.showElements;

    const updateStatusOrdersSubmit = async data => {
        if(data.status !== 'mercadoria devolvida') {
            await updateOrderStatus({ orderId: itemSelected.id, status: data.status });
            handleClose(true);
        } else {
            setShowModal('returnMerchandiseStock');
        }
    }

    const searchOrderSubmit = async ({ id, ...data }) => {
        try {
            if (!id) {
                const search = Object.entries(data).reduce((ac, [key, value], i) => {
                    return value ? ac += `&${key}=${value}` : ac;
                },`?searchtype=default`);
    
                const resultSearchList = await searchOrders(search).then(r => r.data);
    
                setList(resultSearchList);
            } else {
                const order = await getOrderById(id).then(r => r.data);
                setList(order ? [order] : []);
            }

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
                    ...ac, [id]: { ...itemSelected.merchandiseList.find(m => m.id == id), quantity: 1, status: 'nao processada' }
                }
            }, {})
            await updateOrderExchangeMerchandise({ orderId: itemSelected.id, exchangedMerchandise: Object.values(exchangedMerchandise) });
            handleClose(true);
        }
    }

    const approveExchangeSubmit = async () => {
        try {
            await updateStatusOrdersSubmit({ status: 'troca autorizada' })
        } catch (error) {
            window.alert("Falha na autorização")
        }
    }

    const createDescriptionsList = (helper, item) => {
        return helper.reduce((ac, inp) => {
            return [...ac, <React.Fragment key={'dt' + inp.key}><dt>{inp.title}</dt><dd>{item[inp.key]}</dd><br /></React.Fragment>]
        }, [])
    }

    const returnMerchandiseStockSubmit = async (flag) => {
        try {
            await updateOrderStatus({ orderId: itemSelected.id, status: 'mercadoria devolvida', returnStock: flag });
            handleClose(true);
        } catch (err) {
            window.alert("Falha na atualização de status do pedido")
        }
    }

    const disableRequiredAttribute = helper => helper.map(step => step.map(e =>  ({ ...e, required: false })));

    const makeListWithCheckBox = order => {
        const preparedToList = order.merchandiseList
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
                        {itemSelected.merchandiseList.map(({ book, ...rest }) => createDescriptionsList(productsListDescriptionHelper, { ...book, ...rest }))}
                        <h4>Endereço de entrega</h4>
                        {createDescriptionsList(addressListDescriptionHelper, itemSelected.deliveryAddress)}
                        <h4>Cartões</h4>
                        {itemSelected.creditCardList.map(m => createDescriptionsList(cardListDescriptionHelper, m))}
                        {!!itemSelected.couponAppliedList.length && <h4>Cupons</h4>}
                        {itemSelected.couponAppliedList.map(c => <span key={c.code}>{c.code + '  '}</span>)}
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
        
        case 'returnMerchandiseStock':
            return (
                <>
                    <S.ModalHeader>
                        <h3>Retornar produtos para estoque?</h3>
                        <p>todas as mercadorias desse pedido de troca serão acrescidas aos respectivos estoques.</p>
                    </S.ModalHeader>
                    <S.ModalFooter>
                        <MyButton onClick={() => returnMerchandiseStockSubmit(false)}>Não</MyButton>
                        <MyButton onClick={() => returnMerchandiseStockSubmit(true)}>Sim</MyButton>
                    </S.ModalFooter>
                </>
            )
        
        default:
            return null;
    }
}
