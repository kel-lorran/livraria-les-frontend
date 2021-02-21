import styled from '@emotion/styled';
import { containerBase } from '../../pages/shared/style';

export const Wrapper = styled.header`
    min-height: 65px;
    background: #FDFCFC;
    display: flex;
    align-items: center;
    .logo {
        width: 152px;
        height: 42px;
        object-fit: contain;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const Container = styled.div`
    ${containerBase}
    display: flex;
    justify-content: flex-end;
    position: relative;
    > button + button {
        margin-left: 19px;
    }
`
