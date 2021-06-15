import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IToken from "../modules/users/models/IToken";
import { CreatedTimestamp } from "./Embedded";
import User from "./User";

@Entity("user_token")
export default class Token implements IToken {
    @PrimaryColumn({ name: "token_id" })
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    @ManyToOne((type) => User, { cascade: ["update"] })
    user: User;

    @Column()
    token: string;

    @Column({ name: "expires_at", type: "timestamp without time zone" })
    expiresAt: Date;

    @Column((type) => CreatedTimestamp)
    createdAt: CreatedTimestamp;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
