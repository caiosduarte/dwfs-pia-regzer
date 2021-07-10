import { AuthError } from "../errors/AuthError";
import { cookieProvider } from "../providers";
import { validateUserPermissions } from "./validateUserPermissions";
import jwt_decode, { InvalidTokenError } from "jwt-decode";

function decodeTokenToUserPermissions() {
    return jwt_decode<{
        isAdmin: boolean;
        permissions?: string[];
        roles?: string[];
    }>(cookieProvider.token);
}

export function isAuthPresent(): boolean {
    try {
        return (
            cookieProvider.isAuthPresent() && !!decodeTokenToUserPermissions()
        );
    } catch (err) {
        if (err instanceof InvalidTokenError) {
            return false;
        }
    }
    return false;
}

export function withGuest(toAuthorized: () => void) {
    if (isAuthPresent()) {
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
            const user = options.user || decodeTokenToUserPermissions();

            const { permissions, roles } = options;

            if (
                !user ||
                !validateUserPermissions({ user, permissions, roles })
            ) {
                // console.log(
                //     "withAuth => entrou no método validateUserPermissions"
                // );
                toAuthorized();
                return await Promise.resolve(false);
            }
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                signOut();
                return await Promise.resolve(false);
            } else {
                return Promise.reject(error);
            }
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
