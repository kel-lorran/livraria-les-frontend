import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../../shared/style';
export * from '../Shared/style';

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
`;

export const Container = styled.div`
    ${containerBase}
    > div {
        max-width: 760px;
        margin: 0 auto;
    }
`;
