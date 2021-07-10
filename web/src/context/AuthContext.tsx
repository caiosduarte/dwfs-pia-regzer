import {
    createContext,
    ReactNode,
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { cookieProvider } from "../providers";

interface ISignInCredentials {
    email: string;
    password: string;
}

interface ISignUpData {
    email: string;
    password: string;
}

interface ICheckInCredentials {
    email: string;
    document?: string;
    cellphone?: string;
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
    canCheckIn: (credentials: ICheckInCredentials) => Promise<boolean>;
    isAuthenticated: boolean;
    isValid: boolean;
    isConfirmed: boolean;
    canAceptPassword: () => boolean;
    toAuthorized: () => void;
    user?: IUser;
}

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>();

    let isAuthenticated = !!user;

    let isValid = !user?.isValid || user?.isValid ? true : false;

    let isConfirmed = !user?.isConfirmed || user?.isConfirmed ? true : false;

    const canAceptPassword = () => {
        const expiresAt = user?.expiresAt;
        return !expiresAt || new Date().getTime() < expiresAt.getTime();
    };

    const canSignIn = () => {
        return isValid && isConfirmed && canAceptPassword();
    };

    const history = useHistory();

    const authChannel = useRef<BroadcastChannel>(new BroadcastChannel("auth"));

    const reset = useCallback(() => {
        cookieProvider.deleteAll();
        setUser(undefined);
        history.push("/");
    }, [history]);

    const signOut = useCallback(() => {
        reset();
        authChannel.current?.postMessage("signOut");
    }, [reset]);

    const toAuthorized = useCallback(() => {
        // TODO: Redirecionamento para o /dashboard (ou a página requisitada antes de autorizar) com as Rotas
        if (!user?.isAdmin) {
            history.push("/register");
        } else {
            history.push("/dashboard");
        }
    }, [user, history]);

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
    }, [reset]);

    useEffect(() => {
        const token = cookieProvider.token;

        if (token) {
            // mantém a parte de permissões e roles o mais atualizadas possível
            api.get("/users", { headers: { Authorization: `Beared ${token}` } })
                .then((response) => {
                    setUser(response.data as IUser);
                })
                .catch((err) => {
                    console.log(
                        "AuthContext => Not a refresh token error: ",
                        err
                    );
                    signOut();
                });
        }
    }, [signOut]);

    async function signIn({ email, password }: ISignInCredentials) {
        const response = await api.post("sessions", { email, password });

        const { token, refreshToken, user } = response.data;

        setUser(user);

        if (!canSignIn()) {
            throw new Error("User can not sign in!");
        }

        cookieProvider.token = token;

        cookieProvider.refreshToken = refreshToken;

        api.defaults.headers["Authorization"] = `Beared ${token}`;

        toAuthorized();

        authChannel.current.postMessage("signIn");
    }

    async function canCheckIn({
        email,
    }: ICheckInCredentials): Promise<boolean> {
        return api
            .get("users", { params: { email } })
            .then((response) => {
                const user = response.data as IUser;

                setUser(user);

                return true;
            })
            .catch((err: AxiosError) => {
                console.log("canCheckIn() => ", err);
                setUser(undefined);
                if (err.response?.status === 404) {
                    return false;
                } else {
                    throw err;
                }
            });
    }

    async function signUp({ email, password }: ISignUpData) {}

    return (
        <AuthContext.Provider
            value={{
                canSignIn,
                signIn,
                signUp,
                signOut,
                canCheckIn,
                isAuthenticated,
                isValid,
                isConfirmed,
                canAceptPassword,
                toAuthorized,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
