import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/SignUp";
import { PasswordForgot } from "../pages/PasswordForgot";
import SignIn from "../pages/SignIn";
import { PasswordReset } from "../pages/PasswordReset";
import Confirm from "../pages/Confirm";

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/confirm/:hash" component={Confirm} />
            <Route path="/password-forgot" exact component={PasswordForgot} />
            <Route
                path="/password-reset/:hash"
                exact
                component={PasswordReset}
            />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    );
}
