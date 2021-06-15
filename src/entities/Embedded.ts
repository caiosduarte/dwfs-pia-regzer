import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreatedTimestamp {
    @CreateDateColumn({
        name: "created_at",
        type: "timestamp without time zone",
    })
    createdAt: Date;
}

class UpdatedTimestamp {
    @UpdateDateColumn({
        name: "created_at",
        type: "timestamp without time zone",
    })
    updatedAt: Date;
}

export class Dated {
    @Column((type) => CreatedTimestamp)
    createdAt: CreatedTimestamp;

    @Column((type) => UpdatedTimestamp)
    updatedAt: UpdatedTimestamp;
}
