import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
    .call-to-action {
        margin: 0 -16px 6vmin;
        > * {
            padding: 0 16px;
        }
    }
`;

export const Container = styled.div`
    ${containerBase}
    > div {
        max-width: 760px;
        margin: 0 auto;
    }
`;

export const WrapperDescriptionList = styled.dl`
    max-width: 448px;
    width: 87vw;
    margin: 0 auto;
    min-height: 60vh;
    dt {
        font-size: 12px;
        font-weight: bold;
        &::after {
            content: ':';
        }
    }
    dd {
        font-size: 14px;
    }
`

export const ModalHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    h3 {
        font-weight: normal;
        font-size: 28px;
        line-height: 33px;
        text-align: center;
        color: #000000;
        width: 100%;
    }
`
