import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import createConnection from "./database";
import AppError from "./errors/AppError";
import routes from "./routes";

const app = express();

app.use(express.json());

createConnection();

app.use(routes);

// TODO: Aplicar inversão de dependência para errors vindos dos módulos
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        console.error(err);

        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${err.message}`,
        });
    }
);

app.listen(3333, () => {
    console.log("Server running on port 3333! ✌");
});
