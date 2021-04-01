import styled from '@emotion/styled'

const gutter = '9px';
const lateralPadding = '14px';
const labelPadding = '2px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px ${gutter} 0;
    margin-bottom: 18px;
    justify-content: center;
    label {
        font-weight: bold;
        font-size: 18px;
        color: #757575;
        left: calc(${lateralPadding} + ${gutter} - ${labelPadding});
        position: absolute;
        bottom: 90%;
    }
    .adorn {
        font-size: 12px;
        width: 14px;
        height: 14px;
        position: absolute;
        right: calc(${lateralPadding} + ${gutter} - ${labelPadding});
        color: #757575;
    }
    .is-required {
        &::after {
            content: '*';
        }
    }
    .warning-message {
        display: none;
        position: absolute;
        bottom: 0;
    }
    .options {
        padding: 0 ${lateralPadding};
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        background: #fbfbfb;
        width: calc(100% - 2 * ${gutter});
        z-index: 1;
        cursor: pointer;
        border-radius: 0 0 4px 4px;
        max-height: 170px;
        overflow-y: auto;
        > * {
            padding: 4px 0;
            & + * {
                border-top: 1px solid #6d6d6d61;
            }
        }
        &:active {
            display: flex;
        }
        ${props => props.multiple ? `
            &:hover {
                display: flex;
            }    
        ` : ''}
    }
    input {
        padding: 0 ${lateralPadding};
        border-radius: 4px;
        border: 1px solid #757575;
        height: 32px;
        font-weight: bold;
        font-size: 18px;
        color: #5B5B5B;
        &:focus ~ .options {
            display: flex;
        }
    }
    @media screen and (min-width: 992px) {
        ${(props) => props.halfSize ? 'width: 50%; display: inline-flex' : ''}
    }
`