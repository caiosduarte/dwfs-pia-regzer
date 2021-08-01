import AppError from "../../../errors/AppError";
import IPerson from "../../people/models/IPerson";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUser from "../models/IUser";
import { IUsersRepository } from "../repositories/IUsersRepository";

type UpdateUser = Partial<ICreateUserDTO> & { id: string; type: string };

class UpdateUserService {
    constructor(private repository: IUsersRepository) {}

    public async execute(values: UpdateUser): Promise<void> {
        const { id, email, type } = values;
        const user = await this.repository.findById(id);

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        // let person = this.peopleRepository.create({ userId: id, type });

        const person = user.person;

        if (person && person?.type !== type) {
            throw new AppError("Can'not change person type yet.", 403);
        }

        user.person = Object.assign<any, Partial<IPerson>>(
            {},
            {
                type,
                user,
            }
        );

        if (email && user.email !== email) {
            user.isConfirmed = false;
        }

        const updatedUser = Object.assign<IUser, UpdateUser>(user, {
            ...values,
        });

        await this.repository.save(updatedUser);
    }
}

export default UpdateUserService;
