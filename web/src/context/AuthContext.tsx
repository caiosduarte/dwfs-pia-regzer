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

export class User implements IIds {
    id!: string;
    name!: string;

    type?: string;

    email?: string;
    document?: string;
    cellphone?: string;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];

    confirmedAt!: Date | null;
    validatedAt!: Date | null;

    public get isValidated() {
        return !!this.validatedAt;
    }

    public get isConfirmed() {
        return !!this.confirmedAt;
    }
}

interface IAuthContextData {
    // canSignIn: (tmpUser: IUser | undefined) => boolean;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signUp: (data: ISignUpData) => Promise<void>;
    signOut: () => void;
    checkIn: (ids: IIds) => Promise<void>;
    isAuthenticated: boolean;
    isConfirmed: boolean;
    toPrivate: () => void;
    toPublic: () => void;
    user?: User;
    isNewUser: boolean;
}

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<User | undefined>();
    const [isNewUser, setIsNewUser] = useState(true);
    const history = useHistory();
    const authChannel = useRef<BroadcastChannel>(new BroadcastChannel("auth"));

    let isAuthenticated = !!user;

    let isValid = !!user?.validatedAt;

    let isConfirmed = !!user?.validatedAt;

    const canSignIn = (guestUser?: User) => {
        return !guestUser
            ? !isNewUser && isValid && isConfirmed
            : isNewUser && guestUser.isValidated && guestUser.isConfirmed;
    };

    const callBackRemoveToken = ({ name = "regzer.token" }) => {
        console.log("Listener do cookie");
        setUser(undefined);
        setIsNewUser(true);
        history.push("/sign-in");
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

    const toPrivate = () => {
        history.push("/dashboard");
    };

    const toPublic = () => {
        history.push("/sign-in");
    };

    const toAuthorized = () => {
        if (isAuthenticated) {
            toPrivate();
        } else {
            toPublic();
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
                    console.log(response.data);
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
            history.push("/sign-in", { _id: email, _email: email });
        } catch (err) {
            const { status } = err.response;
            if (status === 404) {
                // 404 - user não existe
                setIsNewUser(true);
                setUser(undefined);
                history.push("/sign-up", { _email: email });
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
                toPrivate,
                toPublic,
                user,
                isNewUser,
                isConfirmed,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
