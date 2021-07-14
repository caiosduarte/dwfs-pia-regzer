import styled from "styled-components";

export const Container = styled.div`
    margin: 0.7em 0 1.2em;
    border: 0;
    padding: 0;

    min-width: 0;
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;

    .defaultSubmit {
        button[submit] {
            margin-bottom: 0.3em;
        }
    }

    .wrapper {
        position: relative;
    }

    .messageContainer {
        margin: 0.375em 1.75em 0;
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
