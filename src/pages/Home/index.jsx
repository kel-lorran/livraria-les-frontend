import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyCard from '../../components/MyCard';
import MyHeader from '../../components/MyHeader';
import * as S from './style';

import { getAllMerchandise, } from '../../actions/merchandiseActions';

const Home = () => {
    const [merchandiseList, setMerchandiseList] = useState([]);

    useEffect(async () => {
        try {
            const _merchandiseList = await getAllMerchandise().then(r => r.data);
            setMerchandiseList(_merchandiseList);
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
                            {merchandiseList.map(({book: [b]}) => {
                                return (
                                    <MyCard
                                        key={b.id}
                                        cover="https://via.placeholder.com/400x600.jpg?text=Capa+Livro"
                                        callToAction={<Link to={`/livro/${b.id}`}>COMPRAR</Link>}
                                    >
                                        {b.title}
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
