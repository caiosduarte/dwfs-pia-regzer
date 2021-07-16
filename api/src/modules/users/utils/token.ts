import auth from "../config/auth";
import IToken from "../models/IToken";
import { verifyJwt } from "./verifyJwt";

export function verifyToken<T>(token: string): T {
    return verifyJwt<T>(token, auth.jwt.tokenSecret);
}

export function verifyRefreshToken<T>(token: string): T {
    return verifyJwt<T>(token, auth.jwt.refreshTokenSecret);
}

export const isTokenExpired = (
    expiredAt: Date | number | undefined
): boolean => {
    const expiresInMilis =
        expiredAt instanceof Date ? expiredAt.valueOf() : expiredAt;
    const currentMilis = Date.now();

    return !expiresInMilis || currentMilis > expiresInMilis;
};

interface IIDs {
    document?: string;
    cellphone?: string;
    email?: string;
}

const hasIdValid = (ids: IIDs, token: string) => {
    try {
        const {
            email: emailToken,
            document: documentToken,
            cellphone: cellphoneToken,
        } = verifyRefreshToken<IIDs>(token);
        const { email, document, cellphone } = ids;
        if (
            emailToken === email ||
            documentToken === document ||
            cellphoneToken === cellphone
        ) {
            return true;
        }
    } catch {}
    return false;
};

export const isRefreshTokenValid = (
    ids: IIDs,
    refreshToken: IToken
): boolean => {
    return (
        !isTokenExpired(refreshToken.expiresAt) &&
        hasIdValid(ids, refreshToken.token)
    );
};
