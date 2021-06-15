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
import DocumentFile from "./DocumentFile";
import DocumentType from "./DocumentType";
import { CreatedTimestamp } from "./Embedded";
import Person from "./Person";

@Entity("person_document")
export default abstract class Document implements IDocument {
    @PrimaryColumn({ name: "person_document_id" })
    id: string;

    @Column({ name: "person_id" })
    personId: string;

    @ManyToOne((type) => Person, (person) => person.documents)
    @JoinColumn({ name: "person_id" })
    person: Person;

    @OneToOne((type) => DocumentType)
    @JoinColumn({
        name: "document_type_id",
        referencedColumnName: "document_type_id",
    })
    protected type: DocumentType;

    abstract setType(type: DocumentType): void;

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

        this.setType(type);

        if (!this.type.isMain) {
            this.isMain = false;
        }
    }
}
