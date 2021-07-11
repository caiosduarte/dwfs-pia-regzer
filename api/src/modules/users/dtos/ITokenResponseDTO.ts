export interface ITokenResponseDTO {
    user: {
        id: string;
        email?: string;
        document?: string;
        cellphone?: string;
        isAdmin?: boolean;
        roles?: string[];
        permissions?: string[];
    };
    token: string;
    refreshToken: string;
}