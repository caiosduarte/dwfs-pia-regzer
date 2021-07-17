const regexUuid =
    /^((?:\d|[a-f]){8})-((?:\d|[a-f]){4})-((?:\d|[a-f]){4})-((?:\d|[a-f]){4})-((?:\d|[a-f]){5}((?:\d|[a-f]){7}))$/;

const uuidGlobal = new RegExp(regexUuid, "g");

export const isUuid = (value?: string): boolean => {
    return !!value && new RegExp(regexUuid, "g").test(value);
};

export const hasUuid = (value?: string): boolean => {
    return !!value && regexUuid.test(value);
};

const queryParams = (str: string) => {
    const regex = /(?:\?([^?]+)=([^?]+))/g;

    let match;

    const matches: Array<[string, string]> = [];

    while ((match = regex.exec(str)) !== null) {
        matches.push([match[1], match[2]]);
    }

    const params = matches.reduce(
        (obj, value: [string, string]) => ({
            ...obj,
            [value[0]]: value[1],
        }),
        {}
    );

    return params;
};
