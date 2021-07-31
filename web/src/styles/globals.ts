import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --background: #FAFAFA ;    

    --primary-500: #3D4AFF; 

    --secondary-500: #522CE8;

    --red: #e52e4d;

    --green: "#4caf50";

    --strong-green: "#388e3c";

    --text-title: #363F5F;

    --text-body: #969CB3;

    --surface-background: #FFFFFF;    
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    @media (max-width: 1080px) {
        font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
        font-size: 87.5%; // 14px, para a media REM => 1 REM = tamanho da fonte
    }
}

body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;    
}

/* body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
}

h1, h2, h3, h4, h5 {
    font-weight: 700;
}

h6, strong {
    font-weight: 500;
} */

button {
    cursor: pointer;
}

[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
}

.react-modal-overlay {
    background: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.react-modal-content {
    width: 100%;
    max-width: 476px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
}

.react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
}

`;
