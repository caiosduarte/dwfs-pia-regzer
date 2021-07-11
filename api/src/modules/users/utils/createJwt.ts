import { sign } from "jsonwebtoken";
import ICreateJsonWebTokenDTO from "../dtos/ICreateEncodedJwtDTO";
import auth from "../config/auth";
import IUser from "../models/IUser";

function createJwt({
    payload,
    secret,
    subject,
    expiresIn,
}: ICreateJsonWebTokenDTO): string {
    return sign(payload, secret, {
        subject,
        expiresIn,
    });
}

export const createToken = ({id, isAdmin, roles, permissions }: IUser): string  => {
    return createJwt({
                payload: { isAdmin, roles, permissions },
                secret: auth.jwt.tokenSecret,
                subject: id,
                expiresIn: auth.jwt.tokenExpiresIn,
    });
}


export const createRefreshToken = ({id, email, document, cellphone}: IUser): string  => {
    return createJwt({
                payload: { email, document, cellphone },
                secret: auth.jwt.refreshTokenSecret,
                subject: id,
                expiresIn: auth.jwt.refreshTokenExpiresIn,
    });
}



