import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
`;

export const Container = styled.div`
    ${containerBase}
`;

export const SectionOne = styled.section`
    .book-display {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -16px;
        > * {
            padding: 0 16px;
            width: 20%;
            margin-bottom: 30px;
        }
    }
`;
