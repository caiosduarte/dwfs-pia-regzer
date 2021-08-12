import { isAuthValid } from "./auth";

export async function withGuest(toAuthorized: () => void) {
    if (isAuthValid) {
        toAuthorized();
    }
}
