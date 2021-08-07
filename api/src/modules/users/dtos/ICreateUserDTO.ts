export default interface ICreateUserDTO {
    name: string;
    document: string;
    cellphone: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}
