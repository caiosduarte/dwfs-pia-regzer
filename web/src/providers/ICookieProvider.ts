export interface ICookieProvider {
    get token(): string;
    set token(value: string);
    get refreshToken(): string;
    set refreshToken(value: string);
    deleteAll(): Promise<void>;
    deleteAllCallback(
        callback: (options: { name: string }) => void
    ): Promise<void>;
    withContext(context: any): any;
    isAllPresent(): boolean;
    isAuthPresent(): boolean;
}
