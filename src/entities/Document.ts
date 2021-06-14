import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IDocument from "../modules/people/models/IDocument";
import IDocumentFile from "../modules/people/models/IDocumentFile";
import IPerson from "../modules/people/models/IPerson";
import Person from "./Person";

export default abstract class Document implements IDocument {
    @PrimaryColumn()
    id: string;

    @Column()
    person_id: string;

    @ManyToOne((type) => Person, (person) => person.documents)
    @JoinColumn({ name: "person_id" })
    person: IPerson;

    @Column()
    name: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt?: Date;

    number: string;
    date: string;
    personName: string;
    isMain: boolean;
    files?: IDocumentFile[] | undefined;

    constructor() {
        if (this.id) {
            this.id = uuidV4();
        }
    }
}
