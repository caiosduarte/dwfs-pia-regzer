import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreatedTimestamp {
    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;
}

export class Dated {
    @Column((type) => CreatedTimestamp, { prefix: false })
    createdTimestamp: CreatedTimestamp;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
