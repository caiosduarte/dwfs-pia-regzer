import { Router } from "express";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ensureConfirmed from "../middlewares/ensureConfirmed";
import CreateDocumentController from "../modules/people/controllers/CreateDocumentController";
import CreateDocumentService from "../modules/people/services/CreateDocumentService";
import DocumentsRepository from "../repositories/DocumentsRepository";
import PeopleRepository from "../repositories/PeopleRepository";

const peopleRoutes = Router();

const upload = multer({ dest: "./tmp/documents" });

peopleRoutes.use(ensureAuthenticated);
peopleRoutes.use(ensureConfirmed);

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
    (request, response) => {
        const service = new CreateDocumentService(
            DocumentsRepository.getInstance()
        );
        const controller = new CreateDocumentController(service);

        return controller.handle(request, response);
    }
);

export default peopleRoutes;
