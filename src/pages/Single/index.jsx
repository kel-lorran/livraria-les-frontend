import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyCard from '../../components/MyCard';
import MyHeader from '../../components/MyHeader';
import MyButton from '../../components/MyButton';
import Loader from '../../components/Loader';

import * as S from './style';

import { getBookById, } from '../../actions/bookActions';

const Single = ({ match: { params }, history, setBasket, basket }) => {
    const [book, setBook] = useState();
    const { productId } = params;

    useEffect(async () => {
        try {
            const _book = await getBookById(productId).then(r => r.data);
            setBook(_book);
        } catch (error) {
            window.alert("Falha na obtenção das informações do livro");
            console.log(error);
        }
    }, [])

    const buyItem = () => {
        setBasket([...basket, {
            id: book.id,
            quantity: 1,
            item: book
        }]);
        history.push('/cesta-produtos');
    }

    return book ? ( 
        <S.PageWrapper>
            <MyHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <img className="cover-img" src="https://via.placeholder.com/400x600.jpg?text=Capa+Livro" />
                        <div className="text-content">
                            <h1>{book.title}</h1>
                            <p><span className="price">R${(69.99).toLocaleString()}</span><MyButton onClick={buyItem}>Comprar</MyButton></p>
                        </div>
                    </S.Container>
                </S.SectionOne>
                <S.SectionTwo>
                    <S.Container>
                        <div>
                            <h2>Sinopse: {book.title}</h2>
                            <p>{book.sinopse}</p>
                            <h3>Descrição</h3>
                            <ul>
                                <li>Autor:{book.author}</li>
                                <li>Editota: {book.publishing}</li>
                                <li>Ano: {book.year}</li>
                                <li>ISBN: {book.ISBN}</li>
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
