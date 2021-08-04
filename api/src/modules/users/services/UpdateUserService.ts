import AppError from "../../../errors/AppError";
import IPerson from "../../people/models/IPerson";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUser from "../models/IUser";
import { IUsersRepository } from "../repositories/IUsersRepository";

type UpdateUser = Partial<ICreateUserDTO> & {
    id: string;
    type: string;
    person: IPerson;
};

class UpdateUserService {
    constructor(private repository: IUsersRepository) {}

    public async execute(values: UpdateUser): Promise<void> {
        const { id, email, type } = values;
        const user = await this.repository.findById(id);

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        // let person = this.peopleRepository.create({ userId: id, type });

        // if (person && person?.type !== type) {
        //     throw new AppError("Can'not change person type yet.", 403);
        // }

        const person = {
            type,
            user,
            id: user.id,
        } as IPerson;

        if (email && user.email !== email) {
            user.isConfirmed = false;
        }

        const updatedUser = Object.assign<IUser, UpdateUser>(user, {
            ...values,
            person,
        });

        await this.repository.save(updatedUser);

        console.log("Person: ", updatedUser.person);
        // console.log("Person type: ", updatedUser.person?.personType);
    }
}

export default UpdateUserService;
