import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyCard from '../../components/MyCard';
import MyHeader from '../../components/MyHeader';
import * as S from './style';

import { getAllBooksActives, } from '../../actions/bookActions';

const Home = () => {
    const [bookList, setBookList] = useState([]);

    useEffect(async () => {
        try {
            const _activeBookList = await getAllBooksActives().then(r => r.data);
            setBookList(_activeBookList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de livros");
            console.log(error);
        }
    }, [])

    return (
        <S.PageWrapper>
            <MyHeader />
            <main>
                <S.SectionOne>
                    <S.Container>
                        <div className="book-display">
                            {bookList.map(b => {
                                return (
                                    <MyCard
                                        key={b.id}
                                        cover="https://via.placeholder.com/400x600.jpg?text=Capa+Livro"
                                        callToAction={<Link to={`/livro/${b.id}`}>COMPRAR</Link>}
                                    >
                                        Cronicas de Narnia com um texto incrementado para adicionar tamanho
                                    </MyCard>
                                )
                            })}
                        </div>
                    </S.Container>
                </S.SectionOne>
            </main>
        </S.PageWrapper>
    )
}

export default Home;
