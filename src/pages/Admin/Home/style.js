import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
`;

export const Container = styled.div`
    ${containerBase}
    > form {
        min-height: unset;
        flex-direction: row;
        align-items: center;
        margin: 40px auto 40px 0;
        max-width: 530px;
        button[type="submit"] {
            position: relative;
            top: -7px;
            right: -20px;
        }
    }
`;