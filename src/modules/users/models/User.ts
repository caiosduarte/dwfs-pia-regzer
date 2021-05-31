import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import Token from "./Token";

@Entity()
class User {
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

    @Column({ name: "is_confirmed", default: false })
    isConfirmed: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @OneToMany((type) => Token, (token) => token.user, {
        cascade: true,
        //eager: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    tokens?: Token[];

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
