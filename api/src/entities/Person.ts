import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    TableInheritance,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";
import Document from "./PersonDocument";
import { ALL_PERSON_TYPES } from "./Enum";
import User from "./User";
import PersonDocument from "./PersonDocument";
import ICompany from "../modules/people/models/ICompany";
import IIndividual from "../modules/people/models/IIndividual";
import Individual from "./Individual";
import Company from "./Company";
import IUser from "../modules/users/models/IUser";

@Entity()
export default class Person implements IPerson {
    // @PrimaryColumn({ name: "person_id" })
    id: string;

    @Column({ primary: true })
    person_id: string;

    // @OneToOne((type) => User, (user) => user.person)
    @OneToOne((type) => User)
    @JoinColumn({ name: "person_id" })
    user: User;

    @Column({ name: "type", enum: ALL_PERSON_TYPES })
    type: string;

    // public set type(value: string) {
    //     switch (value) {
    //         case ALL_PERSON_TYPES.FISICA:
    //             this._personType = Individual;
    //     }
    // }

    private _personType: IIndividual | ICompany;
    public get personType(): IIndividual | ICompany {
        return this._personType;
    }
    public set personType(value: IIndividual | ICompany) {
        this._personType = value;
    }

    @Column()
    cellphone: string;

    @Column()
    telephone: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at" })
    validAt: Date;

    @OneToMany((type) => Document, (document) => document.person)
    documents?: PersonDocument[];

    constructor(type: ALL_PERSON_TYPES) {
        this.type = type;
    }
}
