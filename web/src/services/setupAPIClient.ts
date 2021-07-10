import axios, { AxiosError } from "axios";
import { AuthError } from "../errors/AuthError";
import { CookieProvider } from "../providers";

let isRefreshing = false;
let failedRequests = [] as IRequest[];

interface IRequest {
    onSuccess: (token: string) => void;
    onFailure: (err: AxiosError) => void;
}

export function authorizationHeader(token: string) {
    return token ? { Authorization: `Beared ${token}` } : {};
}

export function setupAPIClient(context = undefined) {
    const cookieProvider = new CookieProvider(context);

    const api = axios.create({
        baseURL: "https://api.regzer.com.br",
        headers: !!cookieProvider.token
            ? { Authorization: `Beared ${cookieProvider.token}` }
            : {},
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                const message = error.response.data?.message as string;

                if (message?.includes("expired")) {
                    const originalRequest = error.config;

                    if (!isRefreshing) {
                        isRefreshing = true;

                        api.post("/refresh-token", {
                            token: cookieProvider.refreshToken,
                        })
                            .then((response) => {
                                const { token } = response.data;

                                cookieProvider.token = token;

                                cookieProvider.refreshToken =
                                    response.data.refreshToken;

                                api.defaults.headers[
                                    "Authorization"
                                ] = `Beared ${token}`;

                                failedRequests.forEach((request) =>
                                    request.onSuccess(token)
                                );
                            })
                            .catch((err) => {
                                failedRequests.forEach((request) =>
                                    request.onFailure(err)
                                );
                            })
                            .finally(() => {
                                isRefreshing = false;
                                failedRequests = [];
                            });
                    }
                    return new Promise((resolve, reject) => {
                        failedRequests.push({
                            onSuccess: (token: string) => {
                                originalRequest.headers[
                                    "Authorization"
                                ] = `Bearer ${token}`;

                                resolve(api(originalRequest));
                            },
                            onFailure: (err: AxiosError) => reject(err),
                        });
                    });
                } else {
                    if (message.includes("JWT")) {
                        console.log("JWT error => ", message, error);
                        return Promise.reject(new AuthError());
                    }
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
}
