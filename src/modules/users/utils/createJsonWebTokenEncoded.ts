import { sign } from "jsonwebtoken";
import ICreateJsonWebTokenDTO from "../dTOs/ICreateJsonWebTokenDTO";

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
