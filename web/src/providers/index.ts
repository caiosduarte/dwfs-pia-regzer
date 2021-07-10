import { ICookieProvider } from "../providers/ICookieProvider";
import { ReactCookieProvider } from "../providers/implementations/ReactCookieProvider";

export const CookieProvider = ReactCookieProvider;
export const cookieProvider: ICookieProvider = new CookieProvider();

export interface IRedirectorProvider {
    push(to: string): any;
}

class ReactRouterRedirector implements IRedirectorProvider {
    push(to: string) {
        throw new Error("Method not implemented.");
    }
}

export const redirectorProvider: IRedirectorProvider =
    new ReactRouterRedirector();
