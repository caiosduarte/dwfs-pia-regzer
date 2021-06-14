import { Column, Entity, OneToOne } from "typeorm";
import IDocument from "../modules/people/models/IDocument";
import IPerson from "../modules/people/models/IPerson";
import CPF from "./CPF";
import Person from "./Person";

@Entity("person_individual")
export default class Individual extends Person implements IPerson {
    @Column({ name: "person_individual_id" })
    id: string;

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

    @Column()
    mother_name: string;

    @Column()
    father_name: string;

    @Column({
        enum: [
            "SOLTEIRO",
            "UNIÃO ESTÁVEL",
            "CASADO",
            "SEPARADO",
            "DIVORCIADO",
            "VIÚVO",
        ],
    })
    civil_status: string;

    @OneToOne((type) => CPF, (cpf) => cpf.person)
    cpf: CPF;

    constructor() {
        super();
    }
}
