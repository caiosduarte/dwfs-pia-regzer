import { IsDate } from "class-validator";
import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import ICompany from "../modules/people/models/ICompany";
import { ALL_PERSON_TYPES } from "./Enum";
import Person from "./Person";

@ChildEntity(ALL_PERSON_TYPES.JURIDICA)
export default class Company extends Person implements ICompany {
    @Column({ name: "fantasy_name", default: null })
    fantasyName: string;

    @Column({ name: "open_date", type: "date", default: null })
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

    @Column({ name: "responsible_name", default: null })
    responsibleName: string;

    constructor() {
        super();
    }
}
