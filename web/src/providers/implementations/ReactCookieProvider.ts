import { Cookies } from "react-cookie";
import { CookieChangeListener } from "universal-cookie";
import { ICookieProvider } from "../ICookieProvider";

export class ReactCookieProvider implements ICookieProvider {
    public readonly names = {
        token: "regzer.token",
        refreshToken: "regzer.refreshToken",
    };

    private cookies: Cookies;

    get token() {
        return this.cookies.get(this.names.token);
    }

    set token(value: string) {
        this.setCookie(this.names.token, value);
    }

    get refreshToken() {
        return this.cookies.get(this.names.refreshToken);
    }

    set refreshToken(value: string) {
        this.setCookie(this.names.refreshToken, value);
    }

    private setCookie(name: string, value: string) {
        this.cookies.set(name, value, {
            path: "/",
            maxAge: 60 * 60 * 24 * 10, // 10 dias
        });
    }

    async deleteAll() {
        this.namesArray().forEach((name: string) => {
            this.cookies.remove(name);
        });
    }

    async deleteAllCallback(callback: CookieChangeListener) {
        this.cookies.addChangeListener(callback);
        this.namesArray().forEach((name: string) => {
            this.cookies.remove(name);
        });
    }

    withContext(context: any = null) {
        return this;
    }

    isAllPresent(): boolean {
        return this.namesArray().every((name) => !!this.cookies.get(name));
    }

    isAuthPresent(): boolean {
        return !!this.token && !!this.refreshToken;
    }

    namesArray(): string[] {
        return Object.values(this.names);
    }

    constructor(context?: any) {
        this.cookies = new Cookies();
    }
}
