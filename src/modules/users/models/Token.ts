import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import User from "./User";

@Entity("user_token")
export default class Token {
    @PrimaryColumn()
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @ManyToOne((type) => User, (user) => user.tokens)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;

    @Column()
    token: string;

    @Column({ name: "expires_at" })
    expiresAt: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
