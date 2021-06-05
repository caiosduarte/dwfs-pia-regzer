import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const peopleRoutes = Router();

peopleRoutes.post("/document", ensureAuthenticated, (request, response) => {
    const { file } = request.body;
    const { name } = request.query;
    const { id } = request.user;

    return response.status(201).send();
});

export default peopleRoutes;
