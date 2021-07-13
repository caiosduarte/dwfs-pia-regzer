import { idsFromRefreshToken } from "./tokens";

export const getUserIds = <C>(): C | undefined => {
    return idsFromRefreshToken<C>();
};
