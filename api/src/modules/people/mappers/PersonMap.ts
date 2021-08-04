import { keys } from "ts-transformer-keys";

type options = {
    all?: boolean;
    nullify?: boolean;
    partial?: false;
};

function getKeysAndValues<P>(
    createdKeys: string[],
    rawValues: any,
    { all = true, nullify = true }: options
): P {
    return createdKeys.reduce((acc: P, key) => {
        const value = Object.getOwnPropertyDescriptor(rawValues, key)?.value;

        if (value || all)
            return {
                ...acc,
                [key]: !value && nullify ? null : value,
            };

        return acc;
    }, {} as P);
}

export function mapper<P extends object>(
    rawValues: any,
    targetKeys: P | any,
    options?: options
): P | Partial<P> {
    const createdKeys = Object.getOwnPropertyNames(targetKeys);

    if (!options?.partial)
        return getKeysAndValues<P>(createdKeys, rawValues, {
            all: true,
            nullify: true,
        });
    else
        return getKeysAndValues<P>(createdKeys, rawValues, {
            all: true,
            nullify: true,
        }) as Partial<P>;
}

export function mapperWithType<P extends object>(
    rawValues: any,
    options?: options
): P | Partial<P> {
    const createdKeys = Object.getOwnPropertyNames(keys<P>());

    if (!options?.partial)
        return getKeysAndValues<P>(createdKeys, rawValues, {
            all: true,
            nullify: true,
        });
    else
        return getKeysAndValues<P>(createdKeys, rawValues, {
            all: true,
            nullify: true,
        }) as Partial<P>;
}

// const values = { first: "Caio", last: "Duarte", complete: "Caio Duarte" };

// type FirstLast = {
//     first: string;
//     last: string;
// };
// const newObj = mapper<FirstLast>(values, {});
// console.log(newObj);
