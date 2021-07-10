import { useEffect, useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { api } from "../services/api";
import { withAuth } from "../utils";

export function Dashboard() {
    const { user, signOut, toAuthorized } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        permissions: ["metrics.list"],
    });

    useEffect(() => {
        withAuth(
            signOut,
            toAuthorized,
            { user, roles: ["administrator"] },
            api.get("users")
        )
            .then((response) => console.log("dash => ", response))
            .catch((error) => console.log("dash error => ", error));
    }, [signOut, toAuthorized]);

    return (
        <>
            <h1>Dashboard: {user?.id}</h1>
            <button onClick={signOut}>Sign out</button>

            {userCanSeeMetrics && <h2>Métricas com useCan()</h2>}
            <Can permissions={["metrics.list"]}>
                <h2>Métricas com Can Componente</h2>
            </Can>
        </>
    );
}
