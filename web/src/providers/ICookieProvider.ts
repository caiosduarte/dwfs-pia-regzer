export interface ICookieProvider {
    get token(): string;
    set token(value: string);
    get refreshToken(): string;
    set refreshToken(value: string);
    deleteAll(): void;
    withContext(context: any): any;
    isAllPresent(): boolean;
    isAuthPresent(): boolean;
}
