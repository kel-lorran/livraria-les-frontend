import styled from '@emotion/styled';
import { containerBase } from '../../pages/shared/style';

export const Wrapper = styled.header`
    min-height: 65px;
    background: #F8F9FC;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8vmin;
    .logo {
        width: 152px;
        height: 42px;
        object-fit: contain;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    nav {
        background: #3D3D3D;
        width: 100%;
        a {
            font-weight: bold;
            font-size: 18px;
            text-decoration-line: underline;
            color: #FFFFFF;
            margin: 5px 1.3vw;
        }
        .active ~ .active {
            color: #A1A1A1;
        }
        > div {
            display: flex;
            justify-content: center;
        }
    }
    .fa-shopping-cart{
        position: relative;
        margin-left: 0.4em;
        margin-right: 0.4em;
        > span {
            position: absolute;
            top: 70%;
            font-size: 0.6em;
            left: 100%;
        }
    }
`;

export const Container = styled.div`
    ${containerBase}
    .header-items-group {
        display: flex;
        justify-content: flex-end;
        padding: 8px 0;
        position: relative;
        a {
            display: inline-block;
        }
        > button + button {
            margin-left: 19px;
        }
        > a + a {
            margin-left: 19px;
        }
    }
    .cart-expire-display {
        position: absolute;
        top: 100%;
        right: 0;
        padding: 6px 0;
        color: red;
    }
`
