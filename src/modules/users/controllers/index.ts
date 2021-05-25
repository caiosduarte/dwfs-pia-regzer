import UsersRepository from "../repositories/implementations/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import CreateUserController from "./CreateUserController";

export default () => {
    const repository = UsersRepository.getInstance();
    const service = new CreateUserService(repository);
    const createUserController = new CreateUserController(service);

    return createUserController;
};
