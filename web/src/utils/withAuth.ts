import { AuthError } from "../errors/AuthError";
import { getPermissions } from "./getUserPermissions";
import { validateUserPermissions } from "./validateUserPermissions";

interface IUserPermissions {
    id: string;
    isValidated?: boolean;
    isConfirmed?: boolean;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];
}

export interface IAuthPermissions {
    user?: IUserPermissions;
    permissions?: string[];
    roles?: string[];
}

export function withAuth2(
    options: IAuthPermissions,
    toUnauthorized: () => void
) {
    const { user, permissions, roles } = options;
    const userPermissions = user?.id
        ? user
        : getPermissions<IUserPermissions>();

    if (
        !validateUserPermissions({
            user: { ...userPermissions },
            permissions,
            roles,
        })
    ) {
        toUnauthorized();
    }
}

export async function withAuth(
    options: IAuthPermissions,
    toUnauthorized: () => void,
    fn?: Promise<any>,
    signOut?: () => void
): Promise<any> {
    const { permissions, roles } = options;
    const user = options.user || getPermissions<IUserPermissions>();

    if (!user || !validateUserPermissions({ permissions, roles, user })) {
        toUnauthorized();
    }

    if (fn && signOut) {
        try {
            return await fn;
        } catch (error) {
            if (error instanceof AuthError) {
                signOut();
            } else {
                return await Promise.reject(error);
            }
        }
    }

    return await Promise.resolve();
}
