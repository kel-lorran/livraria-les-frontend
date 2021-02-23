import styled from '@emotion/styled'

const gutter = '9px';
const lateralPadding = '14px';
const labelPadding = '2px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px ${gutter} 18px;
    justify-content: center;
    label {
        font-weight: bold;
        color: #A1A1A1;
        left: calc(${lateralPadding} + ${gutter} - ${labelPadding});
        position: absolute;
        font-size: 18px;
    }
    .is-required {
        &::after {
            content: '*';
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
    .warning-message {
        display: none;
        position: absolute;
        bottom: 0;
    }
    @media screen and (min-width: 992px) {
        ${(props) => props.halfSize ? 'width: 50%; display: inline-flex' : ''}
    }
    & + .field-description {
        font-family: Roboto Condensed;
        font-weight: bold;
        font-size: 16px;
        color: #5B5B5B;
        margin-top: 0;
        padding: 0 calc(${lateralPadding} + ${gutter});
    }
`