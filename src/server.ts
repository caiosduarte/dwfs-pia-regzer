import express from "express";
import "express-async-errors";
import "reflect-metadata";
import "./database";
import routes from "./routes";
import { errors } from "./errors";

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors);

app.listen(3333, () => {
    console.log("Server Up on port 3333! ✌");
});
