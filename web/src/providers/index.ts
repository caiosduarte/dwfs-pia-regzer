import { ICookieProvider } from "../providers/ICookieProvider";
import { ReactCookieProvider } from "../providers/implementations/ReactCookieProvider";
import { IJwtProvider } from "./IJwtProvider";
import { VanillaJwtProvider } from "./implementations/VanillaJwtProvider";

export const CookieProvider = ReactCookieProvider;
export const cookieProvider: ICookieProvider = new CookieProvider();

export const JwtProvider = VanillaJwtProvider;
export const jwtProvider: IJwtProvider = new JwtProvider();
