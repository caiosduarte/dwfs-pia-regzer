import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/globals";

export function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
                <GlobalStyle />
            </BrowserRouter>
        </>
    );
}
