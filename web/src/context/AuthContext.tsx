import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { api } from "../services/api";
import { cookieProvider } from "../providers";

interface IIds {
    email?: string;
    document?: string | null;
    cellphone?: string | null;
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
    document?: string | null;
    cellphone?: string | null;

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
    isValidated: boolean;
    isConfirmed: boolean;
    isAuthenticated: boolean;
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
    const [user, setUser] = useState<User>();
    const [isNewUser, setIsNewUser] = useState(true);
    const history = useHistory();
    const authChannel = useRef<BroadcastChannel>(new BroadcastChannel("auth"));

    let isValidated = user?.validatedAt ? true : false;

    let isConfirmed = !!user?.validatedAt;

    let isAuthenticated = !!user && isValidated && isConfirmed;

    const canSignIn = (guestUser?: User) => {
        return !guestUser
            ? !isNewUser && isValidated && isConfirmed
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
        history.push("/");
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
            api.get("/sessions")
                .then((response) => {
                    const { user } = response.data;
                    setUser(user);
                    setIsNewUser(false);
                })
                .catch((err) => {
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

        // authChannel.current.postMessage("signIn");
    }

    async function checkIn(params: IIds) {
        const email = params.email;
        try {
            api.defaults.headers["Authorization"] = {};

            setIsNewUser(false);

            const response = await api.get(`sessions?email=${email}`);

            const { user } = response.data;

            setUser(user);

            history.push("/sign-in", { _id: email });
        } catch (err) {
            const status = err.response.status;

            if (status === 404) {
                setIsNewUser(true);

                setUser(undefined);

                history.push("/sign-up", { _email: email });
            } else if (status !== 401) {
                throw err;
            }
        }
    }

    async function signUp(values: ISignUpData) {
        const response = await api.post("users", { ...values });

        const user = response.data;

        setUser(user);
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                checkIn,

                toPrivate,
                toPublic,
                user,
                isNewUser,
                isValidated,
                isConfirmed,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
