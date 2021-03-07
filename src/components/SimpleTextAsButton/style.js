import styled from '@emotion/styled';

export const CustomButton = styled.button`
    background: none;
    border: none;
    font-weight: bold;
    ${props => `
        font-size: ${props.fontSize};
        color: ${props.color};
        text-transform: ${props.textTransform};
    `}
`;
