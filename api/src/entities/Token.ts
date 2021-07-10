import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import IToken from "../modules/users/models/IToken";
import { CreatedTimestamp } from "./Embedded";
import User from "./User";

@Entity("user_token")
export default class Token implements IToken {
    @PrimaryColumn({ name: "user_token_id" })
    id: string;

    @ManyToOne((type) => User, (user) => user.tokens, {
        cascade: ["update"],
    })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ name: "user_id" })
    userId: string;

    @Column()
    token: string;

    @Column({ name: "expires_at", type: "datetime" })
    expiresAt: Date;

    @Column((type) => CreatedTimestamp, { prefix: false })
    created: CreatedTimestamp;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
