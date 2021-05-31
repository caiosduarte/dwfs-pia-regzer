import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";

export default interface ITokensRepository {
    create(data: ICreateTokenDTO): Promise<Token>;
    findById(id: string): Promise<Token | undefined>;
    deleteById(id: string): Promise<any>;
    findByEncoded(encoded: string): Promise<Token | undefined>;
    save(token: Token): Promise<Token>;
}
