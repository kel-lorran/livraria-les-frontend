import styled from '@emotion/styled'

export const Wrapper = styled.div`
    position: relative;
    .side-label {
        position: absolute;
        left: -28px;
        top: 0;
        bottom: 0;
        width: 1px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.2em;
        color: #545454;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #C4C4C4;
        span {
            transform: rotate(270deg);
            background: white;
            padding: 0 6px;
        }
    }
    .table-container {
        min-height: 100px;
        ${props => props.maxHeight && `
            max-height: ${props.maxHeight};
            overflow-y: auto;
            padding-right: 6px;
    
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
        `}
    }
    table {
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        color: #545454;
        width: 100%;
        text-align: left;
        border-spacing: 0;
        ${props => props.columnWidths.reduce((ac, [column, width]) => ac += `td:nth-of-type(${column}) { max-width: ${width}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,'')}
    }
    thead {
        font-weight: bold;
        text-transform: uppercase;
        color: #5B5B5B;
    }
    tbody {
        cursor: pointer;
        tr {
            &:hover {
                background: #F3F3F3;
            }
        }
        td {
            padding: 5px 0;
            border-top: 2px solid #C4C4C4;
        }
        ${props => props.rowSelected.length ? `
            ${props.rowSelected.reduce((ac, e) => [...ac,`tr:nth-of-type(${e})`],[])} {
                background: #545454;
                color: white;
            }
        ` : ''}
    }
`;
