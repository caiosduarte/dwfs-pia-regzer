export default interface IUserResponseDTO {
    id: string;
    name: string;
    document: string;
    cellphone: string;
    email: string;
    isConfirmed: boolean;
    createdAt: Date;
}
