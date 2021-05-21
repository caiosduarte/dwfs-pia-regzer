import User from "../models/User";

interface IUsersRepository {
    findByCpf(cpf: string): User;
    findByEmail(email: string): User;
    create(): User;
}
