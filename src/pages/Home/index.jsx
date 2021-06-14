import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MyCard from 'components/MyCard';
import MyHeader from 'components/MyHeader';
import Loader from 'components/Loader';

import * as S from './style';

import { getAllCategories } from 'actions/constants';
import { searchMerchandises } from 'actions/merchandiseActions';

const Home = () => {
    const [merchandiseList, setMerchandiseList] = useState([]);

    useEffect(async () => {
        try {
            const categories = await getAllCategories().then(r => r.data);
            const promiseArr = categories
                .sort(e => Math.random() > 0.5 ? -1 : 1)
                .filter((e , i) => i < 5)
                .map(({ id }) => searchMerchandises(`?category=${id}`).then(r => r.data))

            const _merchandiseList = await Promise.all(promiseArr);
            setMerchandiseList(_merchandiseList);
        } catch (error) {
            window.alert("Falha na obtenção da lista de livros");
            console.log(error);
        }
    }, [])

    return merchandiseList ? (
        <S.PageWrapper>
            <MyHeader />
            <main>
                {merchandiseList.map(_merchandiseList => !!_merchandiseList.length && (
                    <S.SectionOne key={_merchandiseList?.[0]?.book.category.name || Math.random()}>
                        <S.Container>
                            <h3>{_merchandiseList?.[0]?.book.category.name}</h3>
                            <div className="book-display">
                                {_merchandiseList.map(({ book, id }) => {
                                    return (
                                        <MyCard
                                            key={id}
                                            cover="https://via.placeholder.com/400x600.jpg?text=Capa+Livro"
                                            callToAction={<Link to={`/livro/${id}`}>COMPRAR</Link>}
                                        >
                                            {book.title}
                                        </MyCard>
                                    )
                                })}
                            </div>
                        </S.Container>
                    </S.SectionOne>
                ))}
            </main>
        </S.PageWrapper>
    ) : <Loader />
}

export default Home;
