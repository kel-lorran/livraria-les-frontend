import styled from '@emotion/styled';

export const Wrapper = styled.form`
  max-width: 448px;
  width: 87vw;
  margin: 0 auto;
  min-height: 60vh;
  max-height: 73vh;
  display: flex;
  flex-direction: column;

  .my-input-group {
      margin: 0 -9px;
      flex-grow: 1;
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
  }
  button {
      margin: 0 auto;
  }
  ${props => props.s}
`;
