import { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import MyHeader from 'components/MyHeader';
import MyTable from 'components/MyTable';
import MyButton from 'components/MyButton';
import InputMultiple from 'components/InputMultiple';
import SimpleTextAsButton from 'components/SimpleTextAsButton';
import MyModal from 'components/MyModal';
import ModalContentHelper from './ModalContentHelper';
import Loader from 'components/Loader';

import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard } from './helper';

import * as S from './style';

import { getFullProfile } from 'actions/customerActions';
import { getDraftOrderById, updateDraftOrder, saveNewOrder, commitOrder } from 'actions/orderActions';

import { setOrder, clearOrder } from 'store/order';

import { updateMerchandiseList } from 'utils';
import { TIMER_EXPIRE_CART_KEY, TIMER_EXPIRE_CART_INITIAL } from 'utils/data/constants';

import { useQuantityControlFetch } from 'hooks/useQuantityControlFetch';

const TIMER_PER_STEP = 30000;

const Cart = ({ history }) => {
    const dispatch =  useDispatch();
    const storeUser = useSelector(store => store.user);
    const storeOrder = useSelector(store => store.order);

    const [showLoader, setShowLoader] = useState(false);

    const [customer, setCustomer] = useState();
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedCard, setSelectedCard] = useState([]);
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [cardList, setCardList] = useState([]);
    const quantityControlFetch = useQuantityControlFetch()[2];
    const [internTimer, setInternTimer, verifyValidityOfCart] = useQuantityControlFetch();
    const [cartSessionStoreTime, setCartSessionStoreTime] = useState();
    
    const [showModal, setShowModal] = useState(false);

    const quantityControl = (increment, bookId) => {
        const newOrder = { ...storeOrder, merchandiseList: updateMerchandiseList({ bookId, quantity: increment, order: storeOrder }) };
        quantityControlFetch(() => () => {
            updateDraftOrder(newOrder).then(r => {
                dispatch(setOrder({ ...storeOrder, merchandiseList: r.data.data.merchandiseList }));
            }).catch(e => {
                getDraftOrderById(storeOrder.id).then(r => dispatch(setOrder(r.data)))
                window.alert("Quantidade dessa mercadoria excedeu nosso estoque, voce pode tentar novamente com um valor menor");
            })
        }, 4000);
        dispatch(setOrder(newOrder));
    }; 

    const buildData = (rawData, quantityControl) => {
        return rawData.map(({ book, ...rest }) => ({ ...rest, ...book, quantityControl}));
    }

    useEffect(async () => {
        if(storeOrder?.status === 'pré-visualização') {
            setShowModal('aboutOrder');
        }
    }, [storeOrder]);

    useEffect(async () => {
        if(storeUser.token) {
            const { addressList, creditCardList, ..._customer } = await getFullProfile().then(r => r.data);
            setAddressList(addressList);
            setCardList(creditCardList);
            setCustomer(_customer);
        }
    }, [storeUser])

    useEffect(() => {
        if (storeOrder.merchandiseList.length > 0) {
            verifyValidityOfCart(() => () => {
                const timer = +(window.sessionStorage.getItem(TIMER_EXPIRE_CART_KEY) || 0);
                if(timer > 0) {
                    const newValueToRestTime = timer - TIMER_PER_STEP;
                    window.sessionStorage.setItem(TIMER_EXPIRE_CART_KEY, newValueToRestTime);
                    setCartSessionStoreTime(newValueToRestTime);
                    setInternTimer(TIMER_PER_STEP);
                } else {
                    window.alert(`O prazo de ${TIMER_EXPIRE_CART_INITIAL / 1000} segundos de reserva dos produtos na cesta expirou, será necessario inseri-los novamente para continuar. Fazemos isso para dar oportunidades a todos de terem acessos a nossos produtos.`);
                    dispatch(clearOrder());
                }
            }, 3000);
        }
    }, [storeOrder]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const manageSelectedCards = (card) => {
        const newSet = new Set(selectedCard);
        if(newSet.delete(card)) return setSelectedCard([...newSet])
        if(selectedCard.size === 2) {
            const [, ...rest] = selectedCard
            setSelectedCard([...rest, card])
        } else {
            setSelectedCard([...selectedCard, card])
        }
    }

    const createPreviewOrder = async e => {
        try{
            setShowLoader(true);
            const orderFromBack = await saveNewOrder({
                ...storeOrder,
                customerId: customer.id,
                deliveryAddress: selectedAddress,
                billingAddress: selectedAddress,
                creditCardList: selectedCard,
                couponAppliedList: selectedCoupons
            }).then(r => r.data.data);
            dispatch(setOrder(orderFromBack))
        } catch (error) {
            window.alert("Falha na criação da pré-visualização do pedido de compra");
            console.log(error);
        } finally {
            setShowLoader(false);
        }
    }

    const finishOrder = async () => {
        try {
            await commitOrder(storeOrder);
            window.alert('sucesso no envio, pedido em analise!');
            setShowModal('false');
            dispatch(clearOrder());
            history.push('/');
        } catch (error) {
            window.alert('falha na confirmação do pedido de compra');
        }
    }
 
    return ( 
        <S.PageWrapper>
            <MyHeader cartExpireTime={{
                text: 'a sua cesta de compras expira em: ',
                value: cartSessionStoreTime + internTimer
            }} />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <div>
                            <Link className="link-continue-action" to="/"><SimpleTextAsButton>Continuar comprando...</SimpleTextAsButton></Link>
                            <div className="table-group">
                                <MyTable data={buildData(storeOrder.merchandiseList, quantityControl)} {...tableOptionsProducts} sideLabel={'Produtos'} maxHeight="250px" />
                            </div>
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            {storeUser.token ?  storeOrder.merchandiseList.length && (
                                <>
                                    <div className="table-group">
                                        {!!addressList.length ? (
                                            <div>
                                                <div className="instruction-group">
                                                    <p>Selecione o endereço de entrega</p>
                                                    <Link to='/profile/endereco'>Gerenciar Endereços</Link>
                                                </div>
                                                <MyTable onClick={row => setSelectedAddress(row)} data={addressList} {...tableOptionsAddress} sideLabel={'Endereços'} maxHeight="250px" />
                                            </div>
                                        ) : (
                                            <Link className="manager-profile-item  add-to-continue" to='/profile/endereco'>Adicionar endereço para continuar...</Link>
                                        )}
                                        {!!cardList.length ? (
                                            <div>
                                                <div className="instruction-group">
                                                    <p>Selecione o cartão desejado</p>
                                                    <Link to='/profile/cartao'>Gerenciar Cartões</Link>
                                                </div>
                                                <MyTable onClick={manageSelectedCards} data={cardList} {...tableOptionsCard} sideLabel={'Cartões'} maxHeight="250px" />
                                            </div>
                                        ) : (
                                            <Link className="manager-profile-item add-to-continue" to='/profile/cartao'>Adicionar cartão para continuar...</Link>
                                        )}
                                    </div>
                                    <div className="cupon-group">
                                        <h3>CUPONS - caso possua adicione abaixo</h3>
                                        <InputMultiple onChange={({ target: { value } }) => setSelectedCoupons(value)} placeholder="+ cupon" />
                                    </div>
                                    <div className="main-action">
                                        <MyButton type="button" title={!(selectedAddress && selectedCard) ? 'escolha um cartão e endereço para continuar' : ''} disabled={!(selectedAddress && selectedCard)} onClick={createPreviewOrder}>Finalizar Compra</MyButton>
                                    </div>
                                </>
                            ) || null : storeOrder.merchandiseList.length && (
                                <Link className="link-continue-action" to={{
                                    pathname: '/login',
                                    search: '?redirectUrl=/cesta-produtos'
                                }}><SimpleTextAsButton>Logar para continuar</SimpleTextAsButton></Link>
                            ) || null}
                        </div>
                    </S.Container>
                </S.SectionTwo>
            </main>
            <MyModal show={showModal} handleClose={handleCloseModal}>
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} handleSubmit={finishOrder} order={storeOrder} addressList={addressList} setOrder={newValue => dispatch(setOrder(newValue))} />
            </MyModal>
            {showLoader && <Loader />}
        </S.PageWrapper>
    )
}

export default Cart;
