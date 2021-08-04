import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";

import { ALL_PERSON_TYPES } from "./Enum";
import User from "./User";

import Individual from "./Individual";
import Company from "./Company";
import PersonDocument from "./PersonDocument";

// @Entity({
//     orderBy: (user: User) => {
//         const name = user.name;
//         return { name: "DESC" };
//     },
// })
@Entity()
export default class Person implements IPerson {
    @PrimaryColumn({ name: "person_id", update: true })
    id: string;

    @OneToOne((type) => User, {
        // eager: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primary: true,
        // createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: "person_id", referencedColumnName: "id" })
    user: User;

    @Column({ enum: ALL_PERSON_TYPES })
    type: string;

    @OneToOne((type) => Individual, (individual) => individual.person, {
        cascade: true,
        eager: true,
    })
    individual: Individual;

    @OneToOne((type) => Company, (company) => company.person, {
        cascade: true,
        eager: true,
    })
    company: Company;

    personType: Individual | Company;

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    telephone: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at", nullable: true })
    validAt: Date;

    @OneToMany((type) => PersonDocument, (doc) => doc.person)
    documents: PersonDocument[];

    constructor() {
        this.personType = this.individual || this.company;
    }
}
