import {
    IJwtProviderPayload,
    IJwtProvider,
    JwtProviderExpiredError,
    JwtProviderInvalidError,
} from "../IJwtProvider";

export class VanillaJwtProvider implements IJwtProvider {
    decode(token: string): Object | null {
        if (token) {
            try {
                const [, payload] = token.split(".");
                const decodedPayload = JSON.parse(window.atob(payload));
                return decodedPayload;
            } catch {}
        }
        return null;
    }

    verify(token: string): Object | null {
        const decoded = this.decode(token);

        if (decoded) {
            const { exp } = decoded as IJwtProviderPayload;
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
