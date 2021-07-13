import { cookieProvider, jwtProvider } from "../providers";

const token = (): string => {
    return cookieProvider.token;
};

const refreshToken = (): string => {
    return cookieProvider.refreshToken;
};

export const isTokenValid = (): boolean => {
    try {
        return !!jwtProvider.verify(token());
    } catch {}

    return false;
};

export const isAuthTokensPresent = (): boolean => {
    return cookieProvider.isAuthPresent();
};

export const permissionsFromToken = <P>(): P | undefined => {
    try {
        return jwtProvider.verify<P>(token());
    } catch {}
};

export const idsFromRefreshToken = <C>(): C | undefined => {
    return jwtProvider.decode<C>(refreshToken());
};
