import {
    IJwtProviderPayload,
    IJwtProvider,
    JwtProviderExpiredError,
    JwtProviderInvalidError,
    JwtProviderError,
} from "../IJwtProvider";

import jwt_decode, { InvalidTokenError, JwtPayload } from "jwt-decode";

export class JwtDecodeProvider implements IJwtProvider {
    decode<T>(token: string): T | undefined {
        try {
            return jwt_decode<T>(token);
        } catch {}
    }

    verify<T>(token: string): T {
        try {
            const jwt = jwt_decode<T & IJwtProviderPayload>(token);
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
