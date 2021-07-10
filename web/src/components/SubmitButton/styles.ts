import styled from "styled-components";

export const Container = styled.div`
    position: "relative";

    button[submit] {
        margin: 24px 0px 16px;
    }

    .buttonSuccess {
        background-color: var(--green);
        &:hover {
            background-color: var(--strong-green);
        }
    }

    .buttonProgress {
        color: var(--primary-500);
        position: "absolute";
        top: "50%";
        left: "50%";
        margin-top: -12;
        margin-left: -12;
    }
`;
