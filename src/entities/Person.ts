import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";
import Document from "./Document";
import { ALL_PERSON_TYPES } from "./Enum";
import User from "./User";

@Entity()
export default abstract class Person implements IPerson {
    /* @PrimaryColumn({ name: "person_id" }) */
    id: string;

    @Column({ primary: true })
    person_id: string;

    @OneToOne((type) => User, { primary: true })
    @JoinColumn({ name: "person_id" /* , referencedColumnName: "user_id"  */ })
    user: User;

    @Column({ enum: ALL_PERSON_TYPES })
    type: string;

    @Column()
    cellphone: string;

    @Column()
    telephone: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at" })
    validAt: Date;

    @OneToMany((type) => Document, (document) => document.person)
    documents?: Document[];

    constructor(type: ALL_PERSON_TYPES) {
        this.type = type;
    }
}
