import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity("document_type")
export default abstract class DocumentType {
    /*    @PrimaryColumn({ name: "document_type_id" }) */
    id: string;

    @Column({ primary: true })
    document_type_id: string;

    @Column()
    initials: string;

    @Column()
    description: string;

    @Column({ name: "person_type", enum: ["F", "J", "T"] })
    personType: string;

    @Column()
    mask: string;

    @Column({ name: "is_main" })
    isMain: boolean;
}
