import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyCard from '../../components/MyCard';
import MyHeader from '../../components/MyHeader';
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';

import * as S from './style';

import { getBookById, } from '../../actions/bookActions';
import { getMerchandiseById } from '../../actions/merchandiseActions';

const Single = ({ match: { params }, history, updateBasket, basket }) => {
    const [merchandise, setMerchandise] = useState();
    const { productId } = params;

    useEffect(async () => {
        try {
            const { book: [_book], ...rest} = await getMerchandiseById(productId).then(r => r.data);
            setMerchandise({ ...rest, book: _book });
        } catch (error) {
            window.alert("Falha na obtenção das informações do livro");
            console.log(error);
        }
    }, [])

    const buyItem = () => {
        updateBasket({
            ...merchandise,
            quantity: 1,
        });
        history.push('/cesta-produtos');
    }

    return merchandise ? ( 
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
                                <li>ISBN: {merchandise.book.ISBN}</li>
                            </ul>
                        </div>
                    </S.Container>
                </S.SectionTwo>
            </main>
        </S.PageWrapper>
    ) : (
        <Loader />
    )
}

export default Single;
