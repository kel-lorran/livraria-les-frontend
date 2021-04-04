import { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MyHeader from '../../components/MyHeader';
import MyTable from '../../components/MyTable';
import MyButton from '../../components/MyButton';
import InputMultiple from '../../components/InputMultiple';
import SimpleTextAsButton from '../../components/SimpleTextAsButton';
import MyModal from '../../components/MyModal';
import ModalContentHelper from './ModalContentHelper';
import Loader from '../../components/Loader';

import { tableOptionsProducts, tableOptionsAddress, tableOptionsCard } from './helper';

import * as S from './style';

import { getFullProfile } from '../../actions/customerActions';
import { saveNewOrder } from '../../actions/orderActions';
import { getCuponsDiscount } from '../../actions/cupomActions';

const Login = ({ history, updateBasket, clearBasket, basket }) => {
    const storeUser = useSelector(store => store.user);
    const [showLoader, setShowLoader] = useState(false);
    const [customer, setCustomer] = useState();
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedCard, setSelectedCard] = useState();
    const [cupons, setCupons] = useState([]);
    const [cardList, setCardList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState({});
    const quantityControl = (increment, idBook) => updateBasket({ id: idBook, quantity: increment });
    const buildData = (rawData, quantityControl) => {
        return rawData.map(({ book, ...rest }) => ({ ...rest, ...book, quantityControl}));
    }

    useEffect(async () => {
        if(storeUser) {
            const { address, card, ..._customer } = await getFullProfile().then(r => r.data[0]);
            setAddressList(address);
            setCardList(card);
            setCustomer(_customer);
        }
    }, [storeUser])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const finishOrder = async e => {
        try{
            setShowLoader(true);
            const discount = await getCuponsDiscount([...cupons]);
            const subTotal = basket.reduce((ac, m) => ac + (m.quantity * m.price), 0);
            setOrder({
                customer,
                merchandise: basket,
                subTotal,
                discount,
                total: subTotal - discount,
                address: {
                    delivery: selectedAddress,
                    billing: selectedAddress
                },
                card: [selectedCard],
                couponApplied: cupons,
                status: 'em processamento',
                date: (new Date()).getTime()
            });
            setShowModal('aboutOrder');
        } catch (error) {
            console.log(error);
        } finally {
            setShowLoader(false);
        }
    }

    const createOrder = async () => {
        await saveNewOrder(order);
        window.alert('sucesso no envio, pedido em analise!');
        setShowModal('false');
        clearBasket();
        history.push('/');
    }
 
    return ( 
        <S.PageWrapper>
            <MyHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <div>
                            <Link className="link-continue-action" to="/"><SimpleTextAsButton>Continuar comprando...</SimpleTextAsButton></Link>
                            <div className="table-group">
                                <MyTable data={buildData(basket, quantityControl)} {...tableOptionsProducts} sideLabel={'Produtos'} maxHeight="250px" />
                            </div>
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            {storeUser ?  basket.length && (
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
                                                <MyTable onClick={row => setSelectedCard(row)} data={cardList} {...tableOptionsCard} sideLabel={'Cartões'} maxHeight="250px" />
                                            </div>
                                        ) : (
                                            <Link className="manager-profile-item add-to-continue" to='/profile/cartao'>Adicionar cartão para continuar...</Link>
                                        )}
                                    </div>
                                    <div className="cupon-group">
                                        <h3>CUPONS - caso possua adicione abaixo</h3>
                                        <InputMultiple onChange={({ target: { value } }) => setCupons(value)} placeholder="+ cupon" />
                                    </div>
                                    <div className="main-action">
                                        <MyButton type="button" title={!(selectedAddress && selectedCard) ? 'escolha um cartão e endereço para continuar' : ''} disabled={!(selectedAddress && selectedCard)} onClick={finishOrder}>Finalizar Compra</MyButton>
                                    </div>
                                </>
                            ) || null : basket.length && (
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
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} handleSubmit={createOrder} order={order} addressList={addressList} setOrder={setOrder} />
            </MyModal>
            {showLoader && <Loader />}
        </S.PageWrapper>
    )
}

export default Login;
