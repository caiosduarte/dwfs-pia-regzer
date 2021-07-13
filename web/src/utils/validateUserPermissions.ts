interface ComparedLists {
    mainList: string[] | undefined;
    checkList: string[] | undefined;
}

const hasAll = ({ mainList, checkList }: ComparedLists) => {
    return checkList?.every((item) => mainList?.includes(item));
};

const hasAny = ({ mainList, checkList }: ComparedLists) => {
    return checkList?.some((item) => mainList?.includes(item));
};

interface IUserPemissions {
    isConfirmed?: boolean;
    isValid?: boolean;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];
}

interface IAuthPermissions {
    user: IUserPemissions;
    permissions?: string[];
    roles?: string[];
}

export function validateUserPermissions({
    user,
    permissions,
    roles,
}: IAuthPermissions) {
    if (user.isAdmin) {
        return true;
    }

    if (!user?.isValid || !user?.isConfirmed) {
        return false;
    }

    if (!hasAny({ mainList: user.roles, checkList: roles })) {
        return false;
    }

    if (!hasAll({ mainList: user.permissions, checkList: permissions })) {
        return false;
    }

    return true;
}
