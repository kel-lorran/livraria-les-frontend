import styled from '@emotion/styled';

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    ${props => props.show ? 'display: flex;' : 'display: none;'}
    justify-content: center;
    align-items: center;
    > div {
        background: #FFFFFF;
        box-shadow: 0px 0px 56px 2px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 28px 56px;
        position: relative;
    }
    .close-button {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 16px;
        height: 16px;
    }
`;
