export default interface ICreateTokenDTO {
    token: string;
    userId: string;
    expiresAt: Date;
}
