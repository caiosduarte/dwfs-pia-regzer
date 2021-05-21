import { Router } from "express";
import { usersRoutes } from "./users.routes";

const routers = Router();

routers.use(usersRoutes);

export default routers;
