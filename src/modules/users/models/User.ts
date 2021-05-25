import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

import { v4 as uuidV4 } from "uuid";

@Entity()
class User {
    @PrimaryGeneratedColumn("uuid")
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

    @Column()
    is_admin?: boolean;

    @Column()
    is_confirmed?: boolean;

    @CreateDateColumn()
    created_at?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
