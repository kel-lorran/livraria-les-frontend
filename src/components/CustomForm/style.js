import styled from '@emotion/styled';

export const Wrapper = styled.form`
    max-width: 448px;
    width: 87vw;
    margin: 0 auto;
    min-height: 60vh;
    display: flex;
    flex-direction: column;

    .my-input-group {
        margin: 0 -9px;
        flex-grow: 1;
    }
    button {
        margin: 40px auto;
    }
`;
