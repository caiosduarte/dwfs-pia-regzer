import { AuthError } from "../errors/AuthError";
import { cookieProvider, jwtProvider } from "../providers";
import { IJwtProviderPayload } from "../providers/IJwtProvider";
import {
    IUserPermissions,
    validateUserPermissions,
} from "./validateUserPermissions";

const isAuthPresent = (): boolean => {
    return cookieProvider.isAuthPresent();
};

const isTokenValid = (): boolean => {
    try {
        //return !!jwtProvider.verify(cookieProvider.token);
        return false;
    } catch {}

    return false;
};

type Credentials = {
    email?: string;
    document?: string;
    cellphone?: string;
};

export const credentialsFromRefreshToken = (): Credentials | undefined => {
    try {
        const refreshToken = jwtProvider.verify(
            cookieProvider.refreshToken
        ) as Credentials;

        console.log(refreshToken);

        const { email, document, cellphone } = refreshToken;

        if (email || document || cellphone) {
            return { email, document, cellphone };
        }
    } catch (err) {
        console.log(err);
    }
};

export function withGuest(toAuthorized: () => void) {
    if (isTokenValid()) {
        toAuthorized();
    }
}

export interface IAuthPermissions {
    user?: {
        isAdmin?: boolean;
        permissions?: string[];
        roles?: string[];
        isConfirmed?: boolean;
    };
    permissions?: string[];
    roles?: string[];
}

export async function withAuth(
    signOut: () => void,
    toAuthorized: () => void,
    options?: IAuthPermissions,
    fn?: Promise<any>
): Promise<any> {
    if (!isAuthPresent()) {
        // console.log("withAuth => entrou no método isAuthPresent()");
        signOut();
        return await Promise.resolve(false);
    }

    if (options) {
        try {
            // TODO: Testar se o decode do token está carregando as permissões
            const user =
                options.user ||
                (jwtProvider.decode(cookieProvider.token) as IUserPermissions);

            const { permissions, roles } = options;

            if (
                !user ||
                !validateUserPermissions({ user, permissions, roles })
            ) {
                toAuthorized();
                return await Promise.resolve(false);
            }
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    if (fn) {
        try {
            return await fn;
        } catch (error) {
            if (error instanceof AuthError) {
                // console.log("withAuth => detectou AuthError na Promise");
                signOut();
                return await Promise.resolve(false);
            } else {
                // console.log("withAuth => detectou outro erro na Promise");
                return await Promise.reject(error);
            }
        }
    }
    // console.log("withAuth => não detectou nenhum erro");
    return await Promise.resolve(true);
}
