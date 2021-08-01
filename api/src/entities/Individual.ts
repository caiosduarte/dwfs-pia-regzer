import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import IIndividual from "../modules/people/models/IIndividual";
import IPerson from "../modules/people/models/IPerson";
import CPF from "./CPF";
import { ALL_PERSON_TYPES, ETHNICITY, GENDER } from "./Enum";
import Person from "./Person";

@Entity("person_individual")
export default class Individual extends Person implements IIndividual {
    @PrimaryColumn({ name: "person_individual_id" })
    id: string;

    @OneToOne((type) => Person)
    @JoinColumn({
        name: "person_individual_id",
        referencedColumnName: "person_id",
    })
    person: IPerson;

    @Column()
    @IsDate()
    birthday: Date;

    @Column({ enum: GENDER })
    gender: string;

    @Column({
        enum: ETHNICITY,
    })
    ethnicity: string;

    @Column({ name: "mother_name" })
    motherName: string;

    @Column({ name: "father_name" })
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

    @OneToOne((type) => CPF, (cpf) => cpf.person)
    cpf: CPF;

    constructor() {
        super(ALL_PERSON_TYPES.FISICA);
    }
}
