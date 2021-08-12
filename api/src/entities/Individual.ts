import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { ChildEntity, Column } from "typeorm";

import IIndividual from "../modules/people/models/IIndividual";

import { ALL_PERSON_TYPES, CIVIL_STATUS, ETHNICITY, GENDER } from "./Enum";
import Person from "./Person";

@ChildEntity(ALL_PERSON_TYPES.FISICA)
export default class Individual extends Person implements IIndividual {
    @Column()
    @IsOptional()
    @IsDate()
    birthday: Date;

    @Column({ enum: GENDER })
    gender: string;

    @Column({ enum: ETHNICITY, default: ETHNICITY.NAO_DECLARADA })
    ethnicity: string;

    @Column({ name: "mother_name", nullable: true })
    @IsOptional()
    @IsNotEmpty()
    motherName: string;

    @IsOptional()
    @IsNotEmpty()
    @Column({ name: "father_name", nullable: true })
    fatherName: string;

    @Column({
        name: "civil_status",
        enum: CIVIL_STATUS,
    })
    civilStatus: string;

    // @OneToOne((type) => CPF, (cpf) => cpf.person)
    // cpf: CPF;

    constructor() {
        super();
        // if (!this.type) {
        //     this.type = ALL_PERSON_TYPES.FISICA;
        // }
    }
}
