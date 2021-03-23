import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
    .link-continue-action {
        margin-bottom: 32px;
        display: inline-block;
        display: flex;
        justify-content: flex-end;
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
`;

export const SectionTwo = styled.section`
    .table-group {
        > * {
            margin-bottom: 56px;
        }
    }
    .cupon-group {
        margin-bottom: 56px; 
    }
`;

export const WrapperDescriptionList = styled.dl``;

export const ModalFooter = styled.div``;
