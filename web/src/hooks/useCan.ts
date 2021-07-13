import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

interface IUseCanParams {
    isAdmin?: boolean;
    permissions?: string[];
    roles?: string[];
}

export function useCan({ permissions, roles }: IUseCanParams) {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated || !user) {
        return false;
    }

    return validateUserPermissions({ user, permissions, roles });
}
