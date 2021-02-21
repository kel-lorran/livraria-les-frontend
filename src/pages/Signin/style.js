import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style'

export const PageWrapper = styled.div`
    ${pageWrapperBase}
`;

export const Container = styled.div`
    ${containerBase}
`;

export const CustomForm = styled.form`
    max-width: 448px;
    margin: 32px auto;
    > div {
        margin: 0 -9px;
    }
    button {
        margin: 40px auto;
    }
`;

export const ModalContent = styled.form`
    max-width: 448px;
    h3 {
        font-weight: normal;
        font-size: 28px;
        line-height: 33px;
        text-align: center;
        color: #000000;
        margin: 18 0 38px;
    }
    p {
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        text-align: justify;
        color: #000000;
    }
    .row-input {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        p {
            text-align: left;
            min-width: 200px;
        }
    }
    button {
        margin: 26px auto;
    }
`
