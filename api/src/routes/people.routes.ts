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
import { getRepository } from "typeorm";
import Individual from "../entities/Individual";
import UsersRepository from "../repositories/UsersRepository";

const peopleRoutes = Router();

const uploadDocuments = multer(upload);

peopleRoutes.use(ensureAuthenticated);
// peopleRoutes.use(ensureConfirmed);

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
    const { id, type } = request.body;
    const { email, document, isAdmin } = request.body;

    if (!id || !type) {
        throw new AppError("Wrong parameters.", 403);
    }

    const usersRepo = UsersRepository.getInstance();
    const user = await usersRepo.findById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (email !== user.email) {
        user.confirmedAt = undefined;
    }

    const repository = PeopleRepository.getInstance();
    const person = await repository.create({
        id,
        type,
        user: { id, email, document, validatedAt: new Date() },
    });

    return response.status(201).json(PersonMapper.toDTO(person));
});

peopleRoutes.get("/:id", async (request, response) => {
    const { id } = request.params;

    const repository = PeopleRepository.getInstance();

    const person = await repository.findById(id);

    // const repo = getRepository<Individual>(Individual);

    // console.log(`Individual [${id}] get/`, await repo.findOne(id));

    return response.json(PersonMapper.toDTO(person));
});

// peopleRoutes.use(ensurePermission);

peopleRoutes.get("/" /*, ensurePermissions*/, async (request, response) => {
    const { start, offset } = request.query;

    const repository = PeopleRepository.getInstance();

    const people = await repository.find({
        start: Number(start),
        offset: Number(offset),
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
