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

export const SideBar = styled.div``;
