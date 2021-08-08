import { permissionsFromToken } from "./tokens";

export const getPermissions = <P>(): P | undefined => {
    return permissionsFromToken<P>();
};
