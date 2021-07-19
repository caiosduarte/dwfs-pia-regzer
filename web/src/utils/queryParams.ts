export const queryParams = (str: string) => {
    const regex = /(?:[?&]([^&]+)=([^&#]*))/g;

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
