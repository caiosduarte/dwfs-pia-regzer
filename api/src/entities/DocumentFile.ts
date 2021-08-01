import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import IDocumentFile from "../modules/people/models/IDocumentFile";
import Document from "./PersonDocument";

@Entity("person_document_file")
export default class DocumentFile implements IDocumentFile {
    @PrimaryColumn({ name: "person_document_file_id" })
    id: string;

    @ManyToOne((type) => Document, (document) => document.files)
    @JoinColumn({
        name: "person_document_id",
        referencedColumnName: "person_document_id",
    })
    document: Document;

    @Column()
    filename: string;

    @Column()
    mimetype: string;
}
