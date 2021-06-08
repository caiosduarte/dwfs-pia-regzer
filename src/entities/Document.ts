import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import IDocument from "../modules/people/models/IDocument";
import IPerson from "../modules/people/models/IPerson";
import Person from "./Person";

@Entity("person_document")
export default class Document implements IDocument {
    @PrimaryColumn()
    id?: string;

    //@Column()
    //person_id: string;

    @ManyToOne((type) => Person, (person) => person.documents)
    @JoinColumn({ name: "person_id" })
    person: IPerson;

    @Column()
    name: string;

    value?: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}
