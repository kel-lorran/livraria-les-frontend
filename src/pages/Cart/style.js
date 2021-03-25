import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';
export * from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
    .link-continue-action {
        margin-bottom: 32px;
        display: inline-block;
        display: flex;
        justify-content: flex-end;
    }
    .table-group {
        > * {
            margin-bottom: 56px;
        }
    }
    .manager-profile-item {
        display: block;
        font-size: 18px;
        font-weight: bold;
        color: inherit;
        &:not(.add-to-continue) {
            margin-bottom: 24px;
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
`;

export const SectionTwo = styled.section`
    .cupon-group {
        margin-bottom: 56px; 
    }
    .main-action {
        margin-bottom: 56px;
        display: flex;
        justify-content: flex-end;
    }
`;

export const BillingAdrressWrapper = styled.div`
    width: 100%;
`;
