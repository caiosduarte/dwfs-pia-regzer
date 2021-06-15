import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import ICompany from "../modules/people/models/ICompany";
import CPF from "./CPF";
import Person from "./Person";

@Entity("person_company")
export default class Company extends Person implements ICompany {
    @PrimaryColumn({ name: "person_company_id" })
    id: string;

    @OneToOne((type) => Person, { eager: true })
    @JoinColumn({
        name: "person_company_id",
        referencedColumnName: "person_company_id",
    })
    person: Person;

    @Column({ name: "fantasy_name" })
    fantasyName: string;

    @Column({ name: "open_date", type: "date" })
    openDate: Date;

    @Column({ name: "end_date", type: "date" })
    endDate: Date;

    @Column({ name: "responsible_document" })
    responsibleDocument: CPF;

    @Column({ name: "responsible_name" })
    responsibleName: string;

    constructor() {
        super("J");
    }
}
