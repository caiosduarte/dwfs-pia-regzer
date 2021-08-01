import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import ICompany from "../modules/people/models/ICompany";
import IPerson from "../modules/people/models/IPerson";
import CPF from "./CPF";
import { ALL_PERSON_TYPES } from "./Enum";
import Person from "./Person";

@Entity("person_company")
export default class Company extends Person implements ICompany {
    @PrimaryColumn({ name: "person_company_id" })
    id: string;

    @OneToOne((type) => Person, { eager: true })
    @JoinColumn({
        name: "person_company_id",
        referencedColumnName: "person_id",
    })
    person: IPerson;

    @Column({ name: "fantasy_name" })
    fantasyName: string;

    @Column({ name: "open_date", type: "date" })
    @IsDate()
    openDate: Date;

    @Column({ name: "end_date", type: "date", default: null })
    @IsDate()
    endDate: Date;

    // @OneToOne((type) => CPF, (cpf) => cpf.person)
    // @JoinColumn({
    //     name: "responsible_document_id",
    //     referencedColumnName: "person_document_id",
    // })
    // responsibleDocument: CPF;

    @Column({ name: "responsible_name" })
    responsibleName: string;

    constructor() {
        super(ALL_PERSON_TYPES.JURIDICA);
    }
}
