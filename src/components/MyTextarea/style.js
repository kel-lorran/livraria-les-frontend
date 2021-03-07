import styled from '@emotion/styled'

const lateralPadding = '14px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px 9px 18px;
    > * {
        padding: 0 ${lateralPadding};
    }
    label {
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        background: white;
        color: #757575;
    }
    .is-required {
        &::after {
            content: '*';
        }
    }
    textarea {
        border-radius: 4px;
        border: 1px solid #757575;
        min-height: 32px;
        font-weight: bold;
        font-size: 18px;
        color: #5B5B5B;
        padding: ${lateralPadding};
    }
    .warning-message {
        display: none;
        position: absolute;
        bottom: 0;
    }
    @media screen and (min-width: 992px) {
        ${(props) => props.halfSize ? 'width: 50%; display: inline-flex' : ''}
    }
`