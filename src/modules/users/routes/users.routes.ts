import { Router } from "express";
import createUserController from "../controllers";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.post("/", (request, response) => {
    return createUserController().handle(request, response);
});

export default usersRouter;
