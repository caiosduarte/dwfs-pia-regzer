import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { api } from "../services/api";
import { cookieProvider } from "../providers";

interface IIds {
    email: string;
    document?: string;
    cellphone?: string;
}

interface ISignInCredentials {
    email: string;
    document?: string;
    cellphone?: string;

    password: string;
    remember?: string;
}

interface ISignUpData {
    email: string;
    password: string;
}

interface IUser {
    id: string;
    email?: string;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];

    isValid?: boolean;
    isConfirmed?: boolean;
    expiresAt?: Date;
}

interface IAuthContextData {
    canSignIn: () => boolean | undefined;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signUp: (data: ISignUpData) => Promise<void>;
    signOut: () => void;
    checkIn: (ids: IIds) => Promise<void>;
    isAuthenticated: boolean;
    isValid: boolean;
    isConfirmed: boolean;
    toAuthorized: () => void;
    user?: IUser;
    isNewUser: boolean;
}

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>();
    const [isNewUser, setIsNewUser] = useState(true);
    const history = useHistory();
    const authChannel = useRef<BroadcastChannel>(new BroadcastChannel("auth"));

    let isAuthenticated = !!user;

    let isValid = !user?.isValid || user?.isValid ? true : false;

    let isConfirmed = !user?.isConfirmed || user?.isConfirmed ? true : false;

    const canAceptPassword = () => {
        const expiresAt = user?.expiresAt;
        return !expiresAt || new Date().getTime() < expiresAt.getTime();
    };

    const canSignIn = () => {
        return !isNewUser && isValid && isConfirmed && canAceptPassword();
    };

    const reset = () => {
        cookieProvider.deleteAll();
        setUser(undefined);
        setIsNewUser(true);
        history.push("/sign-in");
    };

    const signOut = () => {
        reset();
        authChannel.current?.postMessage("signOut");
    };

    const toAuthorized = () => {
        // TODO: Redirecionamento para o /dashboard (ou a página requisitada antes de autorizar) com as Rotas
        console.log("---toAuthorized---");
        console.log("User", user);
        console.log("isNewUser", isNewUser);
        console.log("isAuthenticated", isAuthenticated);
        console.log("------------");

        if (isAuthenticated) {
            history.push("/dashboard");
        } else {
            history.push("/sign-in");
        }
    };

    useEffect(() => {
        authChannel.current.onmessage = (message) => {
            switch (message.data) {
                case "signOut":
                    reset();
                    break;
                case "signIn":
                    console.log("AuthContext: recebeu mensagem de signIn!");
                    break;
                default:
                    break;
            }
        };
    }, []);

    useEffect(() => {
        const token = cookieProvider.token;

        if (token) {
            // mantém a parte de permissões e roles o mais atualizadas possível
            api.get("/users", { headers: { Authorization: `Beared ${token}` } })
                .then((response) => {
                    const { user } = response.data;
                    setUser(user);
                    console.log("---AuthContext---");
                    console.log("User", user);
                    console.log("isNewUser", isNewUser);
                    console.log("isAuthenticated", isAuthenticated);
                    console.log("------------");
                })
                .catch((err) => {
                    console.log(
                        "AuthContext => Not a refresh token error: ",
                        err
                    );
                    signOut();
                });
        }
    }, []);

    async function enter({ token, refreshToken, user }: any) {
        setUser(user);

        setIsNewUser(false);

        cookieProvider.token = token;

        cookieProvider.refreshToken = refreshToken;

        api.defaults.headers["Authorization"] = `Beared ${token}`;

        history.push("/dashboard");

        authChannel.current.postMessage("signIn");
    }

    async function signIn(data: ISignInCredentials) {
        const response = await api.post("sessions", data);

        await enter(response.data);
    }

    async function checkIn(params: IIds) {
        try {
            const response = await api.post("sessions", params);
            await enter(response.data);
        } catch (err) {
            const { status } = err.response;
            if (status === 401) {
                setIsNewUser(false);
                setUser(undefined);
            } else if (status === 404) {
                // 404 - user não existe
                setIsNewUser(true);
                setUser(undefined);
                history.push("/sign-up");
            } else {
                throw err;
            }
        }
    }

    async function signUp({ email, password }: ISignUpData) {}

    return (
        <AuthContext.Provider
            value={{
                canSignIn,
                signIn,
                signUp,
                signOut,
                checkIn,
                isAuthenticated,
                isValid,
                isConfirmed,
                toAuthorized,
                user,
                isNewUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
