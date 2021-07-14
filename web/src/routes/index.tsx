import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Register } from "../pages/Register";
import { SignUp } from "../pages/SignUp";
import { ForgotPassword } from "../pages/ForgotPassword";
import SignIn from "../pages/SignIn";

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={SignIn} />
            <Route path="/sign-in" exact={true} component={SignIn} />
            <Route path="/sign-up" exact={true} component={SignUp} />
            <Route
                path="/forgot-password"
                exact={true}
                component={ForgotPassword}
            />
            <Route path="/dashboard" exact={true} component={Dashboard} />
            <Route path="/register" exact={true} component={Register} />
            <Route component={NotFound} />
        </Switch>
    );
}
