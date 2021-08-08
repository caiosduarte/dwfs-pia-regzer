import { isAuthValid } from "./auth";

export function withGuest2(toAuthorized: () => void) {
    if (isAuthValid()) {
        toAuthorized();
    }
}

export async function withGuest(toAuthorized: () => void) {
    if (isAuthValid()) {
        toAuthorized();
    }
}
