import styled from '@emotion/styled';

const tagStyleBase = `
    border-radius: 0.4em;
    padding: 0.3em 0.6em;
`;
export const Wrapper = styled.div`
    border-radius: 0.5em;
    border: 1px solid #ddd;
    padding: 0.5em;
    > div {
        > * {
            display: inline-block;
        }
    }
    * + input {
        margin-left: 12px;
    }
    input {
        border: none;
        ${tagStyleBase}
        background: #ddd;
        color: #3d3d3d;
        font-size: 1em;
        font-weight: bold;
        &:focus {
            outline: none;
            &:placeholder {
                color: red;
            }
        }
    }
`;

export const Tag = styled.span`
    ${tagStyleBase}
    background: #3d3d3d;
    color: white;
    position: relative;
    padding-right: 2em;
    font-size: 1em;
    i {
        position: absolute;
        right: 6px;
        top: 0.4em;
    }
`;
