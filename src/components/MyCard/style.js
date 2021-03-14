import styled from '@emotion/styled';

const paddingBottom = '30px';
export const Wrapper = styled.div`
    width: 100%;
    > div {
        position: relative;
    }
    img.cover-img {
        object-fit: cover;
        width: 100%;
        margin-bottom: ${paddingBottom};
    }
    &:hover {
        .call-to-action {
            opacity: 1;
            transition: opacity 0.5s;
        }
    }
    .call-to-action {
        position: absolute;
        bottom: ${paddingBottom};
        width: 100%;
        display: flex;
        justify-content: center;
        background: #4a4a4a85;
        padding: 6px 0;
        opacity: 0;
    }
    .bottom-slot {
        position: absolute;
        bottom: 6px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
