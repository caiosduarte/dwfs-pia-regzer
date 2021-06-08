import { Router } from "express";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ensureConfirmed from "../middlewares/ensureConfirmed";

const peopleRoutes = Router();

const upload = multer({ dest: "./tmp/documents" });

peopleRoutes.use(ensureAuthenticated);
peopleRoutes.use(ensureConfirmed);

interface IFile {
    filename: string;
}

peopleRoutes.post(
    "/:id/document",
    upload.array("files"),
    (request, response) => {
        const { id } = request.params;
        const { name } = request.query;
        const files = request.files as IFile[];

        const filenames = files.map((file) => file.filename);

        // TODO: Criar um filtro de arquivos como: size, mimetype
        console.log("Files => ", files);

        console.log(`files ${filenames} - name ${name} - person_id ${id} `);

        return response.status(201).send({ filenames });
    }
);

export default peopleRoutes;
