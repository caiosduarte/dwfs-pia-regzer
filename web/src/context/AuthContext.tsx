import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { api } from "../services/api";
import { cookieProvider } from "../providers";

interface IIds {
    email?: string;
    document?: string;
    cellphone?: string;
}

interface ISignInCredentials extends IIds {
    password: string;
    remember?: string;
}

interface ISignUpData extends IIds {
    name: string;
    password: string;
}

interface IUser extends IIds {
    id: string;
    name: string;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];

    isValid?: boolean;
    isConfirmed?: boolean;
    expiresAt?: Date;
}

interface IAuthContextData {
    // canSignIn: (tmpUser: IUser | undefined) => boolean;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signUp: (data: ISignUpData) => Promise<void>;
    signOut: () => void;
    checkIn: (ids: IIds) => Promise<void>;
    isAuthenticated: boolean;
    // isValid: boolean;
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

    let isValid = !!user?.isValid;

    let isConfirmed = !!user && user.isConfirmed!;

    const canSignIn = (guestUser: IUser | undefined) => {
        return !guestUser
            ? !isNewUser && isValid && isConfirmed
            : isNewUser && !!guestUser?.isValid && !!guestUser?.isConfirmed;
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
            api.get("/sessions")
                .then((response) => {
                    const { user } = response.data;
                    setUser(user);
                    setIsNewUser(false);
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

    async function enter({ token, refreshToken, user }: any) {}

    async function signIn(params: ISignInCredentials) {
        const { data } = await api.post("sessions", params);

        const { token, refreshToken, user } = data;

        setUser(user);

        setIsNewUser(false);

        cookieProvider.token = token;

        cookieProvider.refreshToken = refreshToken;

        api.defaults.headers["Authorization"] = `Beared ${token}`;

        history.push("/dashboard");

        authChannel.current.postMessage("signIn");
    }

    async function checkIn(params: IIds) {
        const email = params.email;
        try {
            api.defaults.headers["Authorization"] = {};
            setIsNewUser(false);
            setUser(undefined);
            const { data } = await api.get(`sessions?email=${email}`);
            history.push("/sign-in", { emailCheckIn: email });
        } catch (err) {
            const { status } = err.response;
            if (status === 404) {
                // 404 - user não existe
                setIsNewUser(true);
                setUser(undefined);
                history.push("/sign-up", { emailCheckIn: email });
            } else if (status != 401 && status != 403) {
                throw err;
            }
        }
    }

    async function signUp({
        name,
        email,
        document,
        cellphone,
        password,
    }: ISignUpData) {
        const { data } = await api.post("users", {
            name,
            email,
            password,
            document,
            cellphone,
        });

        const { user } = data;

        if (canSignIn(user)) {
            // await signIn(user as ISignInCredentials);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                checkIn,
                isAuthenticated,
                toAuthorized,
                user,
                isNewUser,
                isConfirmed,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
