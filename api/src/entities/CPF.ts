import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import Document from "./PersonDocument";
import DocumentType from "./DocumentType";

class CPFDocumentType extends DocumentType {}

@Entity("person_document")
export default class CPF extends Document {
    setType(type: CPFDocumentType): void {
        throw new Error("Method not implemented.");
    }
    @Column({ length: 11 })
    number: string;

    @Column({ name: "is_main" })
    isMain: boolean;

    constructor() {
        //super();
        super(new CPFDocumentType());
        this.isMain = true;
    }
}
