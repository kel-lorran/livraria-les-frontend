import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
    main {
        display: flex;
        align-items: center;
        justify-content; center;
        > * {
            flex-grow: 1;
            margin-top: -70px;
        }
    }
`;

export const Container = styled.div`
    ${containerBase}
`;

export const SectionOne = styled.section`
`;

export const LoginForm = styled.form`
    max-width: 448px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .my-input-group {
        margin: 0 -9px;
    }
    .recovery-password {
        align-self: flex-end;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #5B5B5B;
        margin-bottom: 24px;
    }
    > p {
        margin-top: 32px;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #5B5B5B;
    }
`
