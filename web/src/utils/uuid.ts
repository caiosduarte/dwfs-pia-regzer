const regexUuid =
    /^((?:\d|[a-f]){8})-((?:\d|[a-f]){4})-((?:\d|[a-f]){4})-((?:\d|[a-f]){4})-((?:\d|[a-f]){5}((?:\d|[a-f]){7}))$/;

const uuidGlobal = new RegExp(regexUuid, "g");

export const isUuid = (value?: string): boolean => {
    return !!value && new RegExp(regexUuid, "g").test(value);
};

export const hasUuid = (value?: string): boolean => {
    return !!value && regexUuid.test(value);
};
