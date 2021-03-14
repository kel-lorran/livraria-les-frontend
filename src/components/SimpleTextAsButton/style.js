import styled from '@emotion/styled';

export const CustomButton = styled.button`
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:active {
        opacity: 0.7;
    }
    ${props => `
        font-size: ${props.fontSize};
        color: ${props.color};
        text-transform: ${props.textTransform};
    `}
`;
