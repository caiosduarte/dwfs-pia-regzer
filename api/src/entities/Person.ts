import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";
import Document from "./PersonDocument";
import { ALL_PERSON_TYPES } from "./Enum";
import User from "./User";
import PersonDocument from "./PersonDocument";

import Individual from "./Individual";
import Company from "./Company";

type PersonType = Individual | Company;

interface IPersonType {
    person: Individual | Company;
}

type PersonType2 = Individual & Company;

@Entity()
export default class Person implements IPerson {
    @PrimaryColumn({ name: "person_id" })
    id: string;

    @OneToOne((type) => User, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "person_id", referencedColumnName: "id" })
    user: User;

    private createPersonType(type: string): void {
        if (type) {
            const id = this.id || this.user?.id;
            let personType: PersonType;
            switch (type) {
                case ALL_PERSON_TYPES.FISICA:
                    personType = new Individual();
                    break;
                default:
                    personType = new Company();
                    break;
            }
            this.personType = Object.assign(personType, {
                id,
            });

            console.log("criando o  personType... ", this.personType);
        }

        console.log("criando com o type... ", type);
    }

    private _type: string;
    @Column({ name: "type", enum: ALL_PERSON_TYPES })
    public get type() {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
        // this.createPersonType(type);
    }

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

    // @OneToOne(() => Individual<IIndividual>)
    public get personType(): PersonType {
        return this.individual || this.company;
    }

    public set personType(value: PersonType) {
        if (value instanceof Individual) {
            this.individual = value;
        } else {
            this.company = value;
        }
    }

    // private _personType: PersonType;
    // @OneToOne(
    //     (type: PersonType) => {
    //         if (type instanceof Individual) {
    //             return Individual;
    //         }
    //         return Company;
    //     },
    //     { cascade: true }
    // )
    // public get personType() {
    //     return this._personType;
    // }

    // public set personType(value: PersonType) {
    //     this._personType = value;
    // }

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    telephone: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at", nullable: true })
    validAt: Date;

    @OneToMany((type) => Document, (document) => document.person, {
        cascade: true,
    })
    documents?: PersonDocument[];
}
