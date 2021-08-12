import { NullableBoolean } from "aws-sdk/clients/glue";
import { IsOptional, ValidateNested } from "class-validator";
import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    TableInheritance,
} from "typeorm";
import IPerson from "../modules/people/models/IPerson";
import IUser from "../modules/users/models/IUser";

import { ALL_PERSON_TYPES, enumValues } from "./Enum";
import PersonDocument from "./PersonDocument";
import User from "./User";

@Entity()
@TableInheritance({
    pattern: "STI",
    column: {
        // select: true,
        name: "type",
        enum: ALL_PERSON_TYPES,
        update: true,
    },
})
export default abstract class Person implements IPerson {
    @PrimaryColumn({ name: "person_id", update: true })
    id: string;

    @IsOptional()
    @ValidateNested()
    @OneToOne((type) => User, {
        eager: true,
        cascade: ["update"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        primary: true,
    })
    @JoinColumn({ name: "person_id", referencedColumnName: "id" })
    user: User;

    @Column({ enum: ALL_PERSON_TYPES })
    type!: string;

    @Column({ nullable: true })
    cellphone: string;

    @Column({ nullable: true })
    telephone: string;

    // @OneToMany((type) => PersonDocument, (doc) => doc.person)
    documents?: PersonDocument[];

    @Column({ name: "validated_at", nullable: true })
    validatedAt?: Date;

    isValid: boolean;

    constructor() {
        this.isValid = !!this.validatedAt;
    }
}
