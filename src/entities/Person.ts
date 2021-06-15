import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";
import IUser from "../modules/users/models/IUser";
import Document from "./Document";
import User from "./User";

@Entity()
export default abstract class Person implements IPerson {
    @PrimaryColumn({ name: "person_id" })
    id: string;

    @OneToOne((type) => User, { eager: true })
    @JoinColumn({ name: "person_id", referencedColumnName: "user_id" })
    user: User;

    @Column({ enum: ["F", "J", "O", "A"] })
    type: string;

    @Column()
    cellphone: string;

    @Column()
    telephone: string;

    @Column({ name: "is_valid", default: false })
    isValid: boolean;

    @Column({ name: "valid_at", type: "timestamp without time zone" })
    validAt: Date;

    @OneToMany((type) => Document, (document) => document.person)
    documents?: Document[];

    constructor(type: string) {
        //this.id = this.user.id;
        this.type = type;
    }
}
