import { useEffect, useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { api } from "../services/api";
import { withAuth } from "../utils/withAuth";

export function Dashboard() {
    const { user, signOut, toPublic } = useContext(AuthContext);

    const userCanSeeMetrics = useCan({
        permissions: ["metrics.list"],
    });

    useEffect(() => {
        // withAuth(
        //     { user, roles: ["administrator"] },
        //     toPublic,
        //     api.get("users"),
        //     signOut
        // )
        //     .then((response) => console.log("dash => ", response))
        //     .catch((error) => console.log("dash error => ", error));
    }, []);

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
