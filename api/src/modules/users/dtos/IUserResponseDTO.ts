export default interface IUserResponseDTO {
    id: string;
    name: string;

    email?: string;
    document?: string;
    cellphone?: string;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];

    isConfirmed?: boolean;
    isValid?: boolean;

    confirmedAt?: Date | null;
    validatedAt?: Date | null;
}
