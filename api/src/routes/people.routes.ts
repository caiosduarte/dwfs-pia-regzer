import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import ensureConfirmed from "../middlewares/ensureConfirmed";
import CreateDocumentController from "../modules/people/controllers/CreateDocumentController";
import CreateDocumentService from "../modules/people/services/CreateDocumentService";
import AWSS3StorageProvider from "../providers/StorageProvider/implementations/AWSS3StorageProvider";
import { LocalStorageProvider } from "../providers/StorageProvider/implementations/LocalStorageProvider";
import DocumentsRepository from "../repositories/DocumentsRepository";
import PeopleRepository from "../repositories/PeopleRepository";

const peopleRoutes = Router();

const uploadDocuments = multer(upload);

peopleRoutes.use(ensureAuthenticated);
peopleRoutes.use(ensureConfirmed);

function diskStorage() {
    switch (process.env.STORAGE) {
        case "local":
            return LocalStorageProvider.getInstance();
        case "s3":
            return AWSS3StorageProvider.getInstance();
        default:
            return LocalStorageProvider.getInstance();
    }
}

peopleRoutes.post("/", async (request, response) => {
    const { name } = request.body;

    const repository = PeopleRepository.getInstance();

    const person = await repository.create({ name });

    console.log("Person saved ", person);

    return response.status(201).json(person);
});

peopleRoutes.get("/", async (request, response) => {
    const { id } = request.user;

    const repository = PeopleRepository.getInstance();

    const person = await repository.findById(id);

    const storageProvider = diskStorage();

    /*     const documentsUrl = person?.documents?.map((doc) =>
        storageProvider.getUrl("documents", doc.filename)
    ); */

    return response.json(person);
});

peopleRoutes.post(
    "/:id/document",
    uploadDocuments.array("files"),
    async (request, response) => {
        const storageProvider = diskStorage();

        const service = new CreateDocumentService(
            DocumentsRepository.getInstance(),
            storageProvider
        );
        const controller = new CreateDocumentController(service);

        return await controller.handle(request, response);
    }
);

export default peopleRoutes;
