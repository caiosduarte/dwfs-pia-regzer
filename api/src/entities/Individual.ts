import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import IIndividual from "../modules/people/models/IIndividual";

import { ETHNICITY, GENDER } from "./Enum";
import Person from "./Person";

@Entity("person_individual")
export default class Individual implements IIndividual {
    @PrimaryColumn({ name: "person_individual_id" })
    id: string;

    @OneToOne((type) => Person, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primary: true,
    })
    @JoinColumn({
        name: "person_individual_id",
        referencedColumnName: "id",
    })
    person: Person;

    @Column()
    @IsDate()
    birthday: Date;

    @Column({ enum: GENDER })
    gender: string;

    @Column({ enum: ETHNICITY, default: ETHNICITY.NAO_DECLARADA })
    ethnicity: string;

    @Column({ name: "mother_name", nullable: true })
    motherName: string;

    @Column({ name: "father_name", nullable: true })
    fatherName: string;

    @Column({
        name: "civil_status",
        enum: [
            "SOLTEIRO",
            "UNIÃO ESTÁVEL",
            "CASADO",
            "SEPARADO",
            "DIVORCIADO",
            "VIÚVO",
        ],
    })
    civilStatus: string;

    // @OneToOne((type) => CPF, (cpf) => cpf.person)
    // cpf: CPF;
}
