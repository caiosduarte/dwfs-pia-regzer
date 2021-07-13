import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { withAuth } from "../utils/withAuth";

export function Register() {
    const { user, signOut, toAuthorized } = useContext(AuthContext);

    useEffect(() => {
        withAuth(
            signOut,
            toAuthorized,
            {
                user,
                permissions: ["user.update"],
                roles: ["user"],
            },
            undefined
        )
            .then((response) => console.log("metrics => ", response))
            .catch((error) => console.log("metrics error => ", error));
    }, [signOut, toAuthorized, user]);

    return <h1>Register</h1>;
}
