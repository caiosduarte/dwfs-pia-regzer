import { Router } from "express";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const peopleRoutes = Router();

const upload = multer({ dest: "./tmp" });

peopleRoutes.use(ensureAuthenticated);

peopleRoutes.post("/document", upload.array("file"), (request, response) => {
    const { file } = request;
    const { name } = request.query;
    const { id } = request.user;

    console.log(`file ${file} - name ${name} - id ${id} `);

    return response.status(201).send();
});

export default peopleRoutes;
