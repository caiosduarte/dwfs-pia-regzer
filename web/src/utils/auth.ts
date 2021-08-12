import { isAuthTokensPresent, isTokenValid } from "./tokens";

export const isAuthPresent: boolean = isAuthTokensPresent();

export const isAuthValid: boolean = isAuthPresent && isTokenValid();
