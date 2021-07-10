import { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface ICanProps {
    children: ReactNode;
    permissions?: string[];
    roles?: string[];
}

export function Can({ children, permissions, roles }: ICanProps) {
    const userCan = useCan({ permissions, roles });

    if (!userCan) {
        return null;
    }
    return <>{children}</>;
}
