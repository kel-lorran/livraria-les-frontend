import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setOrder } from '../../store/order';

import MyHeader from '../../components/MyHeader';
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';

import * as S from './style';

import { getMerchandiseById } from '../../actions/merchandiseActions';
import { saveNewDraftOrder, updateDraftOrder } from '../../actions/orderActions';

import { updateMerchandiseList } from '../../utils';

const Single = ({ match: { params }, history }) => {
    const dispatch = useDispatch();
    const storeOrder = useSelector(store => store.order);
    const [merchandise, setMerchandise] = useState();
    const [showLoader, setShowLoader] = useState(true);
    const { productId } = params;

    useEffect(async () => {
        try {
            const result = await getMerchandiseById(productId).then(r => r.data);
            setMerchandise(result);
            setShowLoader(false);
        } catch (error) {
            window.alert("Falha na obtenção das informações do livro");
            console.log(error);
            history.push('/');
        }
    }, [])

    const buyItem = async () => {
        let result;
        try {
            setShowLoader(true);
            if (!storeOrder.id) {
                result = await saveNewDraftOrder({
                    merchandiseList: [
                        {
                            ...merchandise,
                            quantity: 1,
                        }
                    ]
                }).then(r => r.data.data);
            } else {
                result =  await updateDraftOrder({
                    id: storeOrder.id,
                    merchandiseList: updateMerchandiseList({
                        bookId: merchandise.book.id,
                        quantity: 1,
                        order: storeOrder
                    })
                }).then(r => r.data.data);
            }
            dispatch(setOrder(result));
            setShowLoader(false);
        } catch (error) {
            window.alert('error na criação de pedido temporario, possivelmente falta de estoque');
            history.push('/');
        }
        history.push('/cesta-produtos');
    }

    return showLoader ? ( 
        <Loader />
    ) : (
        <S.PageWrapper>
            <MyHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <img className="cover-img" src="https://via.placeholder.com/400x600.jpg?text=Capa+Livro" />
                        <div className="text-content">
                            <h1>{merchandise.book.title}</h1>
                            <p><span className="price">R${(merchandise.price).toLocaleString()}</span><MyButton onClick={buyItem}>Comprar</MyButton></p>
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            <h2>Sinopse: {merchandise.book.title}</h2>
                            <p>{merchandise.book.sinopse}</p>
                            <h3>Descrição</h3>
                            <ul>
                                <li>Autor:{merchandise.book.author}</li>
                                <li>Editota: {merchandise.book.publishing}</li>
                                <li>Ano: {merchandise.book.year}</li>
                                <li>ISBN: {merchandise.book.isbn}</li>
                            </ul>
                        </div>
                    </S.Container>
                </S.SectionTwo>
            </main>
        </S.PageWrapper>
    )
}

export default Single;
