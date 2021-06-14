import styled from '@emotion/styled';
import { pageWrapperBase, containerBase } from '../shared/style';

export const PageWrapper = styled.div`
    ${pageWrapperBase}
`;

export const Container = styled.div`
    ${containerBase}
`;

export const SectionOne = styled.section`
    margin-bottom: 30px;
    h3 {
        display: flex;
        align-items: center;
        &::after {
            content: '';
            width: 100%;
            background: black;
            height: 1px;
            opacity: 0.25;
            margin-left: 2em;
        }
    }
    .book-display {
        display: flex;
        flex-wrap: wrap;
        border-radius: 4px;
        margin: 0 -16px;
        > * {
            padding: 0 16px;
            width: 20%;
            margin-bottom: 30px;
        }
        a {
            user-select: none;
            color: white;
            font-weight: 500;
            text-decoration: none;
        }
        overflow-x: auto;
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
    }
`;
