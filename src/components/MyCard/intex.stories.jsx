import { action } from '@storybook/addon-actions';
import styled from '@emotion/styled';
import MyCard from ".";

const Wrapper = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    width: 100vw;
    > * {
        max-width: 20%
    }
`;

export default {
    title: 'components/MyCard',
    component: MyCard
}

export const defaultRender = () => (
    <Wrapper>
        <MyCard
            cover="https://via.placeholder.com/400x600.jpg?text=Capa+Livro"
            callToAction={<button>Comprar</button>}
        >
            Cronicas de Narnia com um texto incrementado para adicionar tamanho
        </MyCard>
    </Wrapper>
);
