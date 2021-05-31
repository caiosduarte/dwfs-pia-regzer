import { Router } from "express";
import {
    resetPasswordController,
    sendForgotPasswordMailController,
} from "../controllers";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", (request, response) => {
    return sendForgotPasswordMailController().handle(request, response);
});

passwordRoutes.post("/reset", (request, response) => {
    return resetPasswordController().handle(request, response);
});

export default passwordRoutes;
