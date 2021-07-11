export interface IJwtProviderHeader {
    type?: string;
    alg?: string;
}

export interface IJwtProviderPayload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}

enum JwtProviderErrorType {
    invalid = "JWT invalid.",
    expired = "JWT expired.",
}

export class JwtProviderError extends Error {
    readonly rawToken?: string;

    constructor(message: string, rawToken?: string) {
        super(message);
        this.rawToken = rawToken;
    }
}

export class JwtProviderInvalidError extends JwtProviderError {
    constructor(rawToken?: string) {
        super(JwtProviderErrorType.invalid, rawToken);
    }
}

export class JwtProviderExpiredError extends JwtProviderError {
    readonly expires?: number;

    constructor(rawToken?: string, expires?: number) {
        super(JwtProviderErrorType.expired, rawToken);
        this.expires = expires;
    }
}

export interface IJwtProvider {
    decode: <T>(token: string) => T | undefined;

    verify: <T>(token: string) => T;
}
