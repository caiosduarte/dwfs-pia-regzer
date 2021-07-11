import {
    IJwtProviderPayload,
    IJwtProvider,
    JwtProviderExpiredError,
    JwtProviderInvalidError,
    JwtProviderError,
} from "../IJwtProvider";

import jwt_decode, { InvalidTokenError, JwtPayload } from "jwt-decode";

export class JwtDecodeProvider implements IJwtProvider {
    decode(token: string): Object | null {
        try {
            const decoded = jwt_decode<IJwtProviderPayload>(token);
        } catch {}
        return null;
    }

    verify(token: string): Object | null {
        try {
            const jwt = jwt_decode<IJwtProviderPayload>(token);
            if (jwt.exp && jwt.exp * 1000 >= Date.now()) {
                return jwt;
            } else {
                throw new JwtProviderExpiredError(token, jwt.exp);
            }
        } catch (err) {
            if (err instanceof InvalidTokenError) {
                throw new JwtProviderInvalidError(token);
            }
        }
        throw new JwtProviderError("JWT error.", token);
    }
}
