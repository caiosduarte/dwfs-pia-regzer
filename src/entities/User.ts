import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IToken from "../modules/users/models/IToken";
import IUser from "../modules/users/models/IUser";
import { Dated } from "./Embedded";
import Person from "./Person";
import Token from "./Token";

@Entity()
class User implements IUser {
    @PrimaryColumn({ name: "user_id" })
    id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

    @Column({ name: "is_confirmed", default: true })
    isConfirmed: boolean;

    @OneToMany((type) => Token, (token) => token.user, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    tokens?: Token[];

    @Column((type) => Dated)
    dated: Dated;

    @OneToOne((type) => Person, (person) => person.user, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    })
    person: Person;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
