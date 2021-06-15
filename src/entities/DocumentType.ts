import { Column, Entity } from "typeorm";

@Entity("document_type")
export default abstract class DocumentType {
    @Column("document_type_id")
    id: string;

    @Column()
    initials: string;

    @Column()
    description: string;

    @Column({ name: "person_type", enum: ["F", "J"] })
    personType: string;

    @Column()
    mask: string;

    @Column({ name: "is_main" })
    isMain: boolean;
}
