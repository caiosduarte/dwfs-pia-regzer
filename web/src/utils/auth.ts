import { isAuthTokensPresent, isTokenValid } from "./tokens";

export const isAuthPresent = (): boolean => {
    return isAuthTokensPresent();
};

export const isAuthValid = (): boolean => {
    return isAuthPresent() && isTokenValid();
};
