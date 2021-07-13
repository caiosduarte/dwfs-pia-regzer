import { isAuthValid } from "./auth";

export function withGuest(toAuthorized: () => void): Promise<boolean | any> {
    if (isAuthValid()) {
        toAuthorized();
        return Promise.resolve(false);
    }

    return Promise.resolve(true);
}
