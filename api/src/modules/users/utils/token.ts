export const isTokenExpired = (
    expiredAt: Date | number | undefined
): boolean => {
    const expiresInMilis =
        expiredAt instanceof Date ? expiredAt.valueOf() : expiredAt;
    const currentMilis = Date.now();

    return !expiresInMilis || currentMilis > expiresInMilis;
};
