import { Column, Entity, PrimaryColumn } from "typeorm";
import ICompany from "../modules/people/models/ICompany";
import CPF from "./CPF";
import Person from "./Person";

@Entity("person_company")
export default class Company extends Person implements ICompany {
    @PrimaryColumn({ name: "person_company_id" })
    id: string;

    @Column()
    fantasy_name: string;

    @Column()
    open_date: Date;

    @Column()
    end_date: Date;

    @Column()
    responsibleDocument: CPF;

    @Column()
    responsibleName: string;

    constructor() {
        super();
    }
}
