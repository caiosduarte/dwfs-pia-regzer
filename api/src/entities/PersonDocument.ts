import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IDocument from "../modules/people/models/IDocument";
import DocumentType from "./DocumentType";
import DocumentFile from "./DocumentFile";
import { CreatedTimestamp } from "./Embedded";
import Person from "./Person";

@Entity({ name: "person_document" })
export default class PersonDocument implements IDocument {
    @PrimaryColumn({ name: "person_document_id" })
    id: string;

    @ManyToOne((type) => Person, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "person_id", referencedColumnName: "id" })
    person: Person;

    @OneToOne((type) => DocumentType, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({
        name: "document_type_id",
        referencedColumnName: "id",
    })
    protected type: DocumentType;

    get name() {
        return this.initials || this.type.description;
    }

    get initials() {
        return this.type.initials;
    }

    @Column({ name: "document_number" })
    number: string;

    get numberWithMask() {
        return this.number;
    }

    @Column({ name: "dispatch_date", type: "date" })
    dispatchDate: Date;

    @Column({ name: "issuing_agency" })
    issuingAgency: string;

    @Column({ name: "person_name" })
    personName: string;

    @Column({ name: "is_main", default: false })
    isMain: boolean;

    @OneToMany((type) => DocumentFile, (file) => file.document, {
        cascade: true,
    })
    files?: DocumentFile[];

    @Column((type) => CreatedTimestamp)
    createdAt: CreatedTimestamp;

    constructor(type: DocumentType) {
        if (this.id) {
            this.id = uuidV4();
        }

        this.type = type;

        if (!this.type?.isMain) {
            this.isMain = false;
        }
    }
}
