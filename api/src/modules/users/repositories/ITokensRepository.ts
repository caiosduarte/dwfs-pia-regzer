import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import IToken from "../models/IToken";

export default interface ITokensRepository {
    readonly INSTANCE: ITokensRepository;
    create(data: ICreateTokenDTO): Promise<IToken>;
    findById(id: string): Promise<IToken | undefined>;
    deleteById(id: string): Promise<void>;
    findByEncoded(encoded: string, email?: string): Promise<IToken | undefined>;
    findByEncodedAndUserId(
        encoded: string,
        userId: string
    ): Promise<IToken | undefined>;
    save(token: IToken): Promise<IToken>;
}
