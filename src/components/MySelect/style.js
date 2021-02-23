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
        color: #A1A1A1;
        left: calc(${lateralPadding} + ${gutter} - ${labelPadding});
        position: absolute;
    }
    .adorn {
        font-size: 12px;
        width: 14px;
        height: 14px;
        position: absolute;
        right: calc(${lateralPadding} + ${gutter} - ${labelPadding});
        color: #A1A1A1;
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
        width: calc(100% - 2 * (${lateralPadding} + ${gutter}));
        z-index: 1;
        cursor: pointer;
        border-radius: 0 0 4px 4px;
        &:hover {
            display: flex;
        }
        > * {
            padding: 4px 0;
            & + * {
                border-top: 1px solid #6d6d6d61;
            }
        }
    }
    input {
        padding: 0 ${lateralPadding};
        border-radius: 4px;
        border: 1px solid #A1A1A1;
        height: 32px;
        font-weight: bold;
        font-size: 18px;
        color: #5B5B5B;
        &:focus ~ .options {
            display: flex;
        }
        &:focus, &:valid, &.fill {
            & + label {
                padding: 0 ${labelPadding};
                background: white;
                font-size: 12px;
                top: -0.25em;
                transition: all 0.2s;
            }
        }
    }
    @media screen and (min-width: 992px) {
        ${(props) => props.halfSize ? 'width: 50%; display: inline-flex' : ''}
    }
`