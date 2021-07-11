export default interface IUserResponseDTO {
    id: string;
    name: string;
    document?: string;
    email: string;
    isAdmin: boolean;
    isConfirmed: boolean;
}
