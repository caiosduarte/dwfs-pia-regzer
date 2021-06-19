import { sign } from "jsonwebtoken";
import ICreateJsonWebTokenDTO from "../dtos/ICreateEncodedJwtDTO";

export default function createJsonWebTokenEncoded({
    payload,
    secret,
    subject,
    expiresIn,
}: ICreateJsonWebTokenDTO): string {
    return sign({ payload }, secret, {
        subject,
        expiresIn,
    });
}
