import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import IDocumentFile from "../modules/people/models/IDocumentFile";
import PersonDocument from "./PersonDocument";
import Document from "./PersonDocument";

@Entity("person_document_file")
export default class DocumentFile implements IDocumentFile {
    @PrimaryColumn({ name: "person_document_file_id" })
    id: string;

    @Column()
    person_document_id: string;

    @ManyToOne((type) => PersonDocument, (document) => document.files, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({
        name: "person_document_id",
        referencedColumnName: "id",
    })
    document: PersonDocument;

    @Column()
    filename: string;

    @Column()
    mimetype: string;
}
