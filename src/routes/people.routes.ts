import { Router } from "express";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ensureConfirmed from "../middlewares/ensureConfirmed";
import DocumentsRepository from "../repositories/DocumentsRepository";
import PeopleRepository from "../repositories/PeopleRepository";

const peopleRoutes = Router();

const upload = multer({ dest: "./tmp/documents" });

peopleRoutes.use(ensureAuthenticated);
peopleRoutes.use(ensureConfirmed);

interface IFile {
    filename: string;
    mimetype: string;
}

peopleRoutes.post("/", async (request, response) => {
    const { name } = request.body;

    const repository = PeopleRepository.getInstance();

    const person = await repository.create({ name });

    console.log("Person saved ", person);

    return response.status(201).json(person);
});

peopleRoutes.get("/:id", async (request, response) => {
    const { id } = request.params;

    const repository = PeopleRepository.getInstance();

    const person = await repository.findById(id);

    return response.json(person);
});

peopleRoutes.post(
    "/:id/document",
    upload.array("files"),
    async (request, response) => {
        // controller
        const { id } = request.params;
        const { name } = request.query;
        const files = request.files as IFile[];

        // service

        // TODO: Criar um filtro de arquivos como: size, mimetype
        console.log("Files => ", files);

        const repository = DocumentsRepository.getInstance();

        const documents = files.map(async (file) => {
            return await repository.create({
                person_id: id,
                name: String(name),
                filename: file.filename,
                mimetype: file.mimetype,
            });
        });

        console.log(`documents ${documents} - name ${name} - person_id ${id} `);

        return response.status(201).json({ documents });
    }
);

export default peopleRoutes;
