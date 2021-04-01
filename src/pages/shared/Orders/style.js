import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../style';
export * from '../style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
    .call-to-action {
        margin: 0 -16px 6vmin;
        > * {
            padding: 0 16px;
        }
        .title {
            font-size: 24px;
            color: black;
            text-transform: uppercase;
            padding-right: 0px;
            font-weight: bold;
        }
    }
    .table-group {
        > * {
            margin-bottom: 56px;
        }
    }
    .has-exchanged-merchandise {
        background: #545454;
        color: white;
        border: 4px solid transparent;
    }
`;

export const Container = styled.div`
    ${containerBase}
    > div {
        max-width: 760px;
        margin: 0 auto;
    }
`;

export const CustomLi = styled.li`
    text-align: center;
    font-size: 14px;
    list-style: none;
    display: flex;
    align-items: center;
    margin: 1em 0.3em;
`;
