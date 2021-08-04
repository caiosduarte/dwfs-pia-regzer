import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import ICompany from "../modules/people/models/ICompany";
import Person from "./Person";

@Entity("person_company")
export default class Company implements ICompany {
    @PrimaryColumn({ name: "person_company_id" })
    id: string;

    @OneToOne((type) => Person, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({
        name: "person_company_id",
        referencedColumnName: "id",
    })
    person: Person;

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
}
