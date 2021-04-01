import styled from '@emotion/styled';

export const pageWrapperBase = `
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    main {
        flex-grow: 1;
    }
`

export const containerBase = `
    max-width: 1138px;
    margin-left: auto;
    margin-right: auto;
    width: 93%;
`;

export const WrapperDescriptionList = styled.dl`
    max-width: 448px;
    width: 87vw;
    margin: 0 auto;
    min-height: 60vh;
    max-height: 67vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #F8F9FC;
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #C4C4C4;
    }

    dt {
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        min-width: 100px;
        &::after {
            content: ':';
        }
    }
    dd {
        font-size: 14px;
        display: inline-block;
        margin-left: 1.5em;
    }
`

export const ModalHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    h3 {
        font-weight: normal;
        font-size: 28px;
        line-height: 33px;
        text-align: center;
        color: #000000;
        width: 100%;
    }
    > * {
        margin: 8px 0;
    }
`

export const ModalFooter = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    width: 90vw;
    h3 {
        font-weight: normal;
        font-size: 28px;
        line-height: 33px;
        text-align: center;
        color: #000000;
        width: 100%;
    }
    > * {
        margin: 8px 0;
    }
`;
