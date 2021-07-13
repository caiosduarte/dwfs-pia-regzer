import { AuthError } from "../errors/AuthError";
import { getExistingPermissions } from "./getUserPermissions";
import { validateUserPermissions } from "./validateUserPermissions";

interface IUserPermissions {
    isValid?: boolean;
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

export async function withAuth(
    signOut: () => void,
    toAuthorized: () => void,
    options?: IAuthPermissions,
    fn?: Promise<any>
): Promise<boolean | any> {
    if (options) {
        const user = options.user || getExistingPermissions<IUserPermissions>();
        const { permissions, roles } = options;

        if (!user || !validateUserPermissions({ user, permissions, roles })) {
            toAuthorized();
            return await Promise.resolve(false);
        }
    }

    if (fn) {
        try {
            return await fn;
        } catch (error) {
            if (error instanceof AuthError) {
                signOut();
            }
            return await Promise.reject(error);
        }
    }

    return await Promise.resolve(true);
}
