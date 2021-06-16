import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreatedTimestamp {
    @CreateDateColumn({
        name: "created_at",
        type: "datetime",
    })
    createdAt: Date;
}

export class Dated {
    @Column((type) => CreatedTimestamp, { prefix: false })
    createdTimestamp: CreatedTimestamp;

    @UpdateDateColumn({ name: "updated_at", type: "datetime" })
    updatedAt: Date;
}
