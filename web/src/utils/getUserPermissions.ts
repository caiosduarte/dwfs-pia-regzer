import { permissionsFromToken } from "./tokens";

export const getExistingPermissions = <P>(): P | undefined => {
    return permissionsFromToken<P>();
};
