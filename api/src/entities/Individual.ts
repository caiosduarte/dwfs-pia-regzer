import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";
import IIndividual from "../modules/people/models/IIndividual";
import IPerson from "../modules/people/models/IPerson";
import CPF from "./CPF";
import { ETHNICITY, GENDER } from "./Enum";
import Person from "./Person";
import User from "./User";

@Entity("person_individual")
export default class Individual implements IIndividual {
    @PrimaryColumn({ name: "person_individual_id" })
    id: string;

    @OneToOne((type) => Person, (person) => person.individual, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn(
        {
            name: "person_individual_id",
            referencedColumnName: "person_id",
        }
        // { referencedColumnName: "type" },
    )
    person: Person;

    @Column()
    @IsDate()
    birthday: Date;

    @Column({ enum: GENDER })
    gender: string;

    @Column({ enum: ETHNICITY })
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

    @OneToOne((type) => CPF, (cpf) => cpf.person, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    cpf: CPF;
}
