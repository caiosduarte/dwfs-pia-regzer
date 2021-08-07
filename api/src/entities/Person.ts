import { NullableBoolean } from "aws-sdk/clients/glue";
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

import { ALL_PERSON_TYPES, enumValues } from "./Enum";
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
    // documents: PersonDocument[];

    @Column({ name: "validated_at", nullable: true })
    validatedAt?: Date;

    isValid: boolean;

    constructor() {
        this.isValid = !!this.validatedAt;
    }
}
