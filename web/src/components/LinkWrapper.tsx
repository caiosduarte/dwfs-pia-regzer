import { ReactChild } from "react";
import { NavLink } from "react-router-dom";

interface LinkWrapperProps {
    to: string;
    children: ReactChild;
    variant?: "body1" | "body2";
}

const LinkWrapper = ({ to, variant, children }: LinkWrapperProps) => (
    <NavLink
        to={to}
        className={
            "MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
        }
    >
        {children}
    </NavLink>
);

export default LinkWrapper;
