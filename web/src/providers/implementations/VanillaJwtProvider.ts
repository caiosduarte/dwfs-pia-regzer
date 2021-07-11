import {
    IJwtProviderPayload,
    IJwtProvider,
    JwtProviderExpiredError,
    JwtProviderInvalidError,
} from "../IJwtProvider";

export class VanillaJwtProvider implements IJwtProvider {
    decode<T>(token: string): T {
        try {
            const [, payload] = token.split(".");
            return JSON.parse(window.atob(payload)) as T;
        } catch {}
    }

    verify<T>(token: string): T {
        const decoded = this.decode<T & IJwtProviderPayload>(token);

        if (decoded) {
            const { exp } = decoded;
            if (typeof exp === "number") {
                if (exp * 1000 >= Date.now()) {
                    return decoded;
                } else {
                    throw new JwtProviderExpiredError(token, exp);
                }
            }
        }
        throw new JwtProviderInvalidError(token);
    }
}
