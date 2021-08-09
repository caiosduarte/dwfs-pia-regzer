import { Router } from "express";
import athenticateRoutes from "./authenticate.routes";
import passwordRoutes from "./password.routes";
import peopleRoutes from "./people.routes";
import statisticsRouter from "./statistics.routes";
import userRoutes from "./users.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use(athenticateRoutes);
routes.use("/password", passwordRoutes);
routes.use("/people", peopleRoutes);

routes.use("/statistics", statisticsRouter);
export default routes;
