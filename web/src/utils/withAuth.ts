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
    options: IAuthPermissions,
    toUnauthorized: () => Promise<void>,
    fn?: Promise<any>,
    signOut?: () => Promise<void>
): Promise<any> {
    const { permissions, roles } = options;
    const user = options.user || getExistingPermissions<IUserPermissions>();

    if (!user || !validateUserPermissions({ permissions, roles, user })) {
        toUnauthorized();
    }

    if (fn && signOut) {
        try {
            return await fn;
        } catch (error) {
            if (error instanceof AuthError) {
                await signOut();
            } else {
                return await Promise.reject(error);
            }
        }
    }

    return await Promise.resolve();
}
