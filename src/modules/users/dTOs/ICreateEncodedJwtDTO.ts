export default interface ICreateJwtDTO {
    secret: string;
    subject: string;
    expiresIn: string;
    payload?: Object | string;
}
