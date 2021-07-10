import { Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";

export function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/dashboard" exact={true} component={Dashboard} />
            <Route path="/register" exact={true} component={Register} />
            <Route component={NotFound} />
        </Switch>
    );
}
