import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Document from "./Document";
import User from "./User";

@Entity()
export default abstract class Person extends User {
    @PrimaryColumn({ name: "person_id" })
    id: string;

    @Column({ enum: ["F", "J", "O", "A"] })
    type: string;

    @Column()
    cellphone: String;

    @Column()
    telephone: String;

    @Column({ default: false })
    is_valid: boolean;

    @Column()
    valid_at: Date;

    @OneToMany((type) => Document, (document) => document.person)
    documents?: Document[];
}
