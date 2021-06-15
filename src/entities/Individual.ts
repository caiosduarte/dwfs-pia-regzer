import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import IIndividual from "../modules/people/models/IIndividual";
import CPF from "./CPF";
import Person from "./Person";

@Entity("person_individual")
export default class Individual extends Person implements IIndividual {
    @Column({ name: "person_individual_id" })
    id: string;

    @OneToOne((type) => Person, { eager: true })
    @JoinColumn({
        name: "person_individual_id",
        referencedColumnName: "person_individual_id",
    })
    person: Person;

    @Column()
    birthday: Date;

    @Column({ enum: ["M", "F"] })
    gender: string;

    @Column({
        enum: [
            "AFRODESCENDENTE",
            "BRANCO",
            "ASIÁTICO",
            "AMERÍNDIO",
            "MULATO",
            "MULTIRRACIAL/PARDO",
            "NÃO DECLARADA",
        ],
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
        super("F");
    }
}
