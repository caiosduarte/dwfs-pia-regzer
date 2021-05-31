import { Router } from "express";
import {
    authenticateUserController,
    refreshTokenController,
} from "../controllers";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", async (request, response) => {
    return authenticateUserController().handle(request, response);
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    return refreshTokenController().handle(request, response);
});

export default authenticateRoutes;
