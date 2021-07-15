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

export const isRefreshTokenValid = (
    ids: IIDs | undefined,
    refreshToken: IToken
): boolean => {
    if (!isTokenExpired(refreshToken.expiresAt)) {
        if (ids) {
            try {
                const {
                    email: emailToken,
                    document: documentToken,
                    cellphone: cellphoneToken,
                } = verifyRefreshToken<IIDs>(refreshToken.token);
                const { email, document, cellphone } = ids;
                if (
                    emailToken === email ||
                    documentToken === document ||
                    cellphoneToken === cellphone
                ) {
                    return true;
                }
            } catch {}
        }
        return true;
    }
    return false;
};
