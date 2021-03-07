import styled from '@emotion/styled';

const gutter = '9px';
const lateralPadding = '14px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    padding: 4px calc(${gutter}) 18px;
    font-family: sen-serif;
    flex-wrap: wrap;
    font-weight: bold;
    color: #757575;
    > p {
        width: 100%;
        font-size: 18px;
    }
`
