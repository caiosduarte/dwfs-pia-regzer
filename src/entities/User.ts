import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IToken from "../modules/users/models/IToken";
import IUser from "../modules/users/models/IUser";
import Token from "./Token";

@Entity()
class User implements IUser {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    cellphone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

    @Column({ name: "is_confirmed", default: true })
    isConfirmed: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @OneToMany((type) => Token, (token) => token.user, {
        cascade: true,
        //eager: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    tokens?: IToken[];

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
