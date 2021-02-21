import styled from '@emotion/styled'

const lateralPadding = '14px';
export const Wrapper = styled.div`
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    padding: 4px 9px 0;
    margin-bottom: 18px;
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
    .warning-message {
        display: none;
        position: absolute;
        bottom: 0;
    }
    .options {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        background: white;
        width: calc(100% - ${lateralPadding});
        z-index: 1;
        cursor: pointer;
        &:hover {
            display: flex;
        }
    }
    input {
        border-radius: 4px;
        border: 1px solid #A1A1A1;
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