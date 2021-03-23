import { useState, useEffect } from 'react';
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

const Login = ({ history, updateBasket, clearBasket, profile, basket }) => {
    const [addressList, setAddressList] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedCard, setSelectedCard] = useState();
    const [cupons, setCupons] = useState();
    const [cardList, setCardList] = useState();
    const [showModal, setShowModal] = useState(false);
    const [order, setOrder] = useState({});
    const loginStatus = profile ? 'logged' : '';
    const quantityControl = (increment, idBook) => updateBasket({ id: idBook, quantity: increment });
    const buildData = (rawData, quantityControl) => {
        return rawData.map(({ book, ...rest }) => ({ ...rest, ...book, quantityControl}));
    }

    useEffect(async () => {
        if(profile) {
            const [{ address, card }] = await getFullProfile().then(r => r.data);
            setAddressList(address);
            setCardList(card);
        }
    }, [profile])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const finishOrder = e => {
        setOrder({
            merchandise: basket,
            address: [selectedAddress],
            card: [selectedCard],
            cupons,
            status: 'compra - em aprovação',
            data: (new Date()).getTime()
        });
        setShowModal('aboutOrder');
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
            <MyHeader authStatus={loginStatus} />
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
                            {loginStatus === 'logged' ?  basket.length && (
                                <>
                                    <div className="table-group">
                                        {addressList && <MyTable onClick={row => setSelectedAddress(row)} data={addressList} {...tableOptionsAddress} sindexeLabel={'Endereços'} maxHeight="250px" />}
                                        {cardList && <MyTable onClick={row => setSelectedCard(row)} data={cardList} {...tableOptionsCard} sideLabel={'Cartões'} maxHeight="250px" />}
                                    </div>
                                    <div className="cupon-group">
                                        <h3>CUPONS - caso possua adicione abaixo</h3>
                                        <InputMultiple onChange={({ target: { value } }) => setCupons(value)} placeholder="+ cupon" />
                                    </div>
                                    <div className="main-action">
                                        <MyButton type="button" onClick={finishOrder}>Finaliza Compra</MyButton>
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
                <ModalContentHelper type={showModal} handleClose={handleCloseModal} handleSubmit={createOrder} order={order} />
            </MyModal>
        </S.PageWrapper>
    )
}

export default Login;
