import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    RelationId,
    UpdateDateColumn,
} from "typeorm";
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    ValidateNested,
    IsOptional,
    IsNotEmpty,
} from "class-validator";
import { v4 as uuidV4 } from "uuid";
import IUser from "../modules/users/models/IUser";
import Token from "./Token";
import Person from "./Person";

@Entity()
class User implements IUser {
    @PrimaryColumn({ name: "user_id" })
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true, unique: true })
    @IsOptional()
    @Length(4, undefined, { message: "Document invalid.", always: true })
    document?: string;

    @Column({ unique: true })
    @IsOptional()
    @IsEmail(
        { allow_display_name: true },
        { message: "Email address invalid.", always: true }
    )
    email?: string;

    @Column({ nullable: true, unique: true })
    @IsOptional()
    @IsNotEmpty()
    cellphone?: string;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    password: string;

    @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

    @OneToMany((type) => Token, (token) => token.user)
    tokens?: Token[];

    @OneToOne((type) => Person, (person) => person.user)
    @IsOptional()
    @ValidateNested()
    person?: Person;

    @Column({ name: "validated_at", nullable: true })
    validatedAt?: Date;

    isValid?: boolean;

    @Column({ name: "confirmed_at", nullable: true })
    confirmedAt?: Date;

    isConfirmed?: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt?: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.isValid = !!this.validatedAt;
        this.isConfirmed = !!this.confirmedAt;
    }
}

export default User;
