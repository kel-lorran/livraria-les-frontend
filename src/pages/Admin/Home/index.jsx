import AdminHeader from '../Shared/AdminHeader'
import * as S from './style';

import grafico1 from '../../../assets/image 1.jpg';

const Home = () => {
    return (
        <S.PageWrapper>
            <AdminHeader />
            <main>
                <S.Container>
                    <div >
                        <img src={grafico1} />
                        <img src={grafico1} />
                    </div>
                </S.Container>
            </main>
        </S.PageWrapper>
    )
}

export default Home;
