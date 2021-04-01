import styled from '@emotion/styled';

export const CustomButton = styled.button`
    padding: 6px 18px;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #000000;
    background: #C4C4C4;
    font-family: Roboto Condensed;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: none;
    text-transform: uppercase;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 0.85;
    }
    &:active {
        opacity: 0.65;
    }
    &:disabled {
        opacity: 0.4;
    }
`;
