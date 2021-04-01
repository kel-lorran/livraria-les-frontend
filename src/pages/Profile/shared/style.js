import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../../shared/style';
export * from '../../shared/style';

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

export const SectionOne = styled.section`
    margin-bottom: 48px;
    > div > div {
        display: flex;
        justify-content: space-around;
    }
`;

export const SectionTwo = styled.section`
    margin-bottom: 48px;
    .person-data-description-list {
        min-height: unset;
    }
`;

export const SectionThree = styled.section`
    text-align: center;
    .cupom-item {
        font-weight: bold;
        margin: 6px -20px;
        > * {
            padding: 4px 20px;
            background: #c4c4c4;
        }
    }
`;
