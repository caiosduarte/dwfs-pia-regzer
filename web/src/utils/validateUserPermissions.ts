export interface IUserPermissions {
    user?: {
        isAdmin?: boolean;
        permissions?: string[];
        roles?: string[];
    };
    permissions?: string[];
    roles?: string[];
}

export function validateUserPermissions({
    user,
    permissions,
    roles,
}: IUserPermissions) {
    const hasAll = (
        mainList: string[] | undefined,
        list: string[] | undefined
    ) => {
        return (
            mainList &&
            list &&
            mainList.length > 0 &&
            list.every((item) => mainList.includes(item))
        );
    };

    const hasAny = (
        mainList: string[] | undefined,
        list: string[] | undefined
    ) => {
        return (
            mainList &&
            list &&
            mainList.length > 0 &&
            list.some((item) => mainList.includes(item))
        );
    };

    if (user?.isAdmin) {
        return true;
    }

    if (!roles && !permissions) {
        return false;
    }

    if (roles && !hasAny(user?.roles, roles)) {
        return false;
    }

    if (permissions && !hasAll(user?.permissions, permissions)) {
        return false;
    }

    return true;
}
