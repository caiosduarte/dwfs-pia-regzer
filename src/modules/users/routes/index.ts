import { Router } from "express";
import usersRouter from "./users.routes";
import athenticateRoutes from "./authenticate.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use(athenticateRoutes);

export default routes;
