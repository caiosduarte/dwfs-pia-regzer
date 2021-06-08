import { Request, Response } from "express";
import CreateDocumentService from "../services/CreateDocumentService";

interface IFile {
    filename: string;
    mimetype: string;
}

export default class CreateDocumentController {
    constructor(private service: CreateDocumentService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.query;
        const files = request.files as IFile[];

        // TODO: Criar um filtro de arquivos como: size, mimetype

        await this.service.execute({
            person_id: id,
            name: String(name) || "Documento diverso",
            files,
        });

        return response.status(201).json({ files });
    }
}
