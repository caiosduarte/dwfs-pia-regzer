import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import ensureConfirmed from "../middlewares/ensureConfirmed";
import CreateDocumentController from "../modules/people/controllers/CreateDocumentController";
import { PersonMapper } from "../mappers/PersonMap";

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
    const { userId, type } = request.body;

    if (!userId || !type) {
        throw new AppError("Wrong parameters.", 403);
    }

    const repository = PeopleRepository.getInstance();

    const person = await repository.create({ userId, type });

    console.log("Person saved ", person);

    return response.status(201).json(person);
});

peopleRoutes.get("/:id", async (request, response) => {
    const { id } = request.params;

    const repository = PeopleRepository.getInstance();

    const person = await repository.findById(id);

    /*     
    const storageProvider = diskStorage();
    const documentsUrl = person?.documents?.map((doc) =>
        storageProvider.getUrl("documents", doc.filename)
    ); */

    console.log(`People [${id}] get/`, person);
    return response.json(PersonMapper.toDTO(person));
});

// peopleRoutes.use(ensurePermission);

peopleRoutes.get("/" /*, ensurePermissions*/, async (request, response) => {
    const { start: startInQuery, offset: offsetInQuery } = request.query;

    const repository = PeopleRepository.getInstance();

    const people = await repository.find({
        start: Number(offsetInQuery),
        offset: Number(offsetInQuery),
    });

    console.log("People ", people);

    return response.json(PersonMapper.toDTO(people));
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
