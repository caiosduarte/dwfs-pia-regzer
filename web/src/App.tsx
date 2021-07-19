import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/globals";

export function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Routes />
                </AuthProvider>
                <GlobalStyle />
            </Router>
        </>
    );
}
