import { Request } from "express";

import { IUsersRepository } from "../repositories/IUsersRepository";

export interface IUserIDs {
    email?: string;
    document?: string;
    cellphone?: string;
    id?: string;
}

export interface IUserSearch extends IUserIDs {
    offset?: string;
    start?: string;
}

export const hasAnyId = ({ email, document, cellphone, id }: IUserIDs) => {
    return !!email || !!document || !!cellphone || !!id;
};

export const findUsers = async (
    query: IUserSearch,
    repository: IUsersRepository
) => {
    if (hasAnyId(query)) {
        return await repository.findByIds({
            ...query,
        });
    } else {
        const { start, offset } = query;
        return await repository.find({
            start: Number(start),
            offset: Number(offset),
        });
    }
};

export const getTokenFromRequest = (request: Request): string | undefined => {
    const valueInBody = () => {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers["x-access-token"] ||
            request.headers["x-access"];
        if (token) {
            return String(token);
        }
    };

    const valueInAuthorizationBeared = () => {
        const authorization = request.headers.authorization;
        if (authorization) {
            const [, token] = authorization.split(" ");
            return token;
        }
    };

    return valueInAuthorizationBeared() || valueInBody();
};

export const getUserIdsFromRequest = (request: Request): string | undefined => {
    return request.query.id || request.body.id || request.params.id;
};
