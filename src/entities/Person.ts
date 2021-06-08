import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IAddress from "../modules/people/models/IAddress";
import IContact from "../modules/people/models/IContact";
import IDocument from "../modules/people/models/IDocument";
import IPerson from "../modules/people/models/IPerson";
import Document from "./Document";

@Entity()
export default class Person implements IPerson {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @OneToMany((type) => Document, (document) => document.person)
    documents?: IDocument[];

    contacts?: IContact[];

    addresses?: IAddress[];

    guarantors?: IPerson[];

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt?: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
