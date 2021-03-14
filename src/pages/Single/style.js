import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
`;

export const Container = styled.div`
    ${containerBase}
`;

export const SectionOne = styled.section`
    margin-bottom: 72px;
    > div {
        display: flex;
    }
    .cover-img {
        width: 460px;
        max-width: 80vw;
        height: 460px;
        max-height: 80vw;
        object-fit: cover;
    }
    .text-content {
        flex-grow: 1;
        text-align: center;
        p {
            display: flex;
            max-width: 380px;
            margin: 0 auto;
            justify-content: space-between;
        }
    }
    .price {
        font-weight: normal;
        font-size: 36px;
        line-height: 42px;
        text-align: center;

        color: #000000;
    }
    h1 {
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        color: #000000;
    }
`;

export const SectionTwo = styled.section`
    margin-bottom: 72px;
    > div > div {
        max-width: 700px;
        margin: 0 auto;
    }
    h2, h3 {
        font-weight: normal;
        font-size: 36px;
        line-height: 42px;
        text-align: center;

        color: #000000;
        border-bottom: solid #C4C4C4 2px;
    }
    p, li {
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;

        color: #000000;
    }
    p,ul {
        margin-bottom: 48px;
    }
`;
