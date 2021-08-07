import { ReactChild } from "react";
import { Link, NavLink } from "react-router-dom";
import { LocationDescriptor } from "history";
import { Email, PanoramaFishEyeSharp } from "@material-ui/icons";

interface LinkWrapperProps {
    to: string;
    params?: {};
    id?: string;
    email?: string;
    cellphone?: string;
    children: ReactChild;
}

const LinkWrapper = ({
    to,
    params,
    id,
    email,
    cellphone,
    children,
}: LinkWrapperProps) => (
    <NavLink
        to={{
            pathname: to,
            state: { ...params, _id: id, _email: email, _cellphone: cellphone },
        }}
        className={
            "MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary"
        }
    >
        {children}
    </NavLink>
);

export default LinkWrapper;
