import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import IDocumentFile from "../modules/people/models/IDocumentFile";
import Individual from "./Individual";

@Entity("person_document")
export default class CPF extends Document {
    @Column()
    id: string;

    @OneToOne((type) => Individual, (individual) => individual.cpf)
    @JoinColumn({ name: "person_id" })
    person: Individual;

    @Column({ name: "document_type_name", default: "CPF" })
    readonly name: string;

    @Column({ length: 11 })
    number: string;

    @Column({ name: "is_main", default: false })
    readonly isMain: boolean;

    files: IDocumentFile[];

    constructor() {
        super();
        this.name = "CPF";
        this.isMain = true;
    }
}
