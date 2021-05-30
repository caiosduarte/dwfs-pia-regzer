import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";

export default interface IUsersTokensRepository {
    create(data: ICreateTokenDTO): Promise<Token>;
    findById(id: string): Promise<Token | undefined>;
}
