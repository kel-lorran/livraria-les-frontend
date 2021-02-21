import styled from '@emotion/styled'

const gutter = '9px';
const lateralPadding = '14px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px ${gutter} 18px;
    > * {
        padding: 0 ${lateralPadding};
    }
    label {
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        background: white;
        color: #A1A1A1;
    }
    .is-required {
        &::after {
            content: '*';
        }
    }
    input {
        border-radius: 4px;
        border: 1px solid #A1A1A1;
        height: 32px;
        font-weight: bold;
        font-size: 18px;
        color: #5B5B5B;
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