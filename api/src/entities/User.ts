import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
} from "class-validator";
import { v4 as uuidV4 } from "uuid";
import IUser from "../modules/users/models/IUser";
import { Dated } from "./Embedded";
import Token from "./Token";
import IToken from "../modules/users/models/IToken";

@Entity()
class User implements IUser {
    @PrimaryColumn({ name: "user_id" })
    id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    cellphone: string;

    @Column()
    password: string;

    @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

    @Column({ name: "is_confirmed", default: false })
    isConfirmed: boolean;

    @Column({ name: "is_valid", default: true })
    isValid: boolean;

    @Column((type) => Dated, { prefix: false })
    dated: Dated;

    @OneToMany((type) => Token, (token) => token.user, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    tokens?: IToken[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            //this.user_id = this.id;
        }
    }
}

export default User;
