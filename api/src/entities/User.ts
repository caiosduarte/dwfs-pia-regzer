import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
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
import Person from "./Person";

@Entity()
class User implements IUser {
    @PrimaryColumn({ name: "user_id" })
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    document: string;

    @Column()
    @IsEmail(
        { allow_display_name: true },
        { message: "Email address invalid." }
    )
    email: string;

    @Column({ nullable: true })
    cellphone: string;

    @Column()
    password: string;

    @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

    @Column({ name: "is_confirmed", default: false })
    isConfirmed: boolean;

    @Column({ name: "is_valid", default: true })
    isValid: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @OneToMany((type) => Token, (token) => token.user, {
        cascade: true,
    })
    tokens?: Token[];

    @OneToOne((type) => Person, (person) => person.user, {
        cascade: true,
    })
    person?: Person;

    @Column({ name: "validated_at", nullable: true })
    validatedAt: Date;

    @Column({ name: "confirmed_at", nullable: true })
    confirmedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
