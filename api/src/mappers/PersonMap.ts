import { keys } from "ts-transformer-keys";
import IUserResponseDTO from "../modules/users/dtos/IUserResponseDTO";
import IUser from "../modules/users/models/IUser";
import IPerson from "../modules/people/models/IPerson";

type options = {
    all?: boolean;
    nullify?: boolean;
    partial?: boolean;
};

function getKeysAndValues<P>(
    rawValues: any,
    createdKeys: string[],
    { all = true, nullify = true, partial = false } = {}
): P | Partial<P> {
    const initialValue = partial ? ({} as Partial<P>) : ({} as P);

    if (!rawValues) return initialValue;

    return createdKeys.reduce((obj: P | Partial<P>, key) => {
        const original = Object.getOwnPropertyDescriptor(rawValues, key)?.value;

        const newValue = !!original || !nullify ? original : null;

        return all ? { ...obj, [key]: newValue } : obj;
    }, initialValue);
}

export function mapper<P extends object>(
    rawValues: any,
    targetKeys: object,
    options?: options
): P | Partial<P> {
    const createdKeys = Object.getOwnPropertyNames(targetKeys);

    return getKeysAndValues<P>(rawValues, createdKeys, options);
}

export function mapperWithType<P extends object>(
    rawValues: any,
    options?: options
): P | Partial<P> {
    const createdKeys = Object.getOwnPropertyNames(keys<P>());

    return getKeysAndValues<P>(rawValues, createdKeys, options);
}

// const values = { first: "Caio", last: "Duarte", complete: "Caio Duarte" };

// type FirstLast = {
//     first: string;
//     last: string;
// };
// const newObj = mapper<FirstLast>(values, {});
// console.log(newObj);

interface IPersonDTO extends IUserResponseDTO {
    type: string;
}

type ReturnPersonMap =
    | IPersonDTO
    | Array<IPersonDTO>
    | Partial<IPersonDTO>
    | Array<Partial<IPersonDTO>>;

export class PersonMap2 {
    static toDTO(from: any): ReturnPersonMap {
        const example = {
            id: "",
            name: "",
            type: "",
            email: "",
            document: "",
            cellphone: "",
            isAdmin: false,
            roles: [""],
            permissions: [""],
            isConfirmed: false,
            isValid: false,
        };
        if (from instanceof Array) {
            return from.map<IPersonDTO | Partial<IPersonDTO>>((value) =>
                mapper<IPersonDTO>(value, example)
            );
        }
        return mapper<IPersonDTO>(from, example);
    }
}

const returnPersonMapped = ({
    id,
    name,
    type,
    email,
    document,
    cellphone,
    isAdmin,
    roles,
    permissions,
    validatedAt,
    confirmedAt,
}: IPerson & IUser) => {
    return {
        id,
        name,
        type,
        email,
        document,
        cellphone,
        isAdmin,
        roles,
        permissions,
        validatedAt,
        confirmedAt,
    };
};

export class PersonMapper {
    static toDTO(person: any): ReturnPersonMap | undefined {
        if (person instanceof Array) {
            return person.map<IPersonDTO | Partial<IPersonDTO>>(
                (person: IPerson & IUser) =>
                    returnPersonMapped({ ...person, ...person.user })
            );
        } else if (person) {
            return returnPersonMapped({ ...person, ...person.user });
        }
    }
}

export class UserMapper {
    static toDTO(user: any): ReturnPersonMap | undefined {
        if (user instanceof Array) {
            return user.map<IPersonDTO | Partial<IPersonDTO>>(
                (user: IUser & IPerson) =>
                    returnPersonMapped({ ...user, ...user.person })
            );
        } else if (user) {
            return returnPersonMapped({ ...user, ...user.person });
        }
    }
}
