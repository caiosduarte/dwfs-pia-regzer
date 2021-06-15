import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreatedTimestamp {
    @CreateDateColumn({
        name: "created_at",
        type: "datetime",
    })
    createdAt: Date;
}

class UpdatedTimestamp {
    @UpdateDateColumn({
        name: "created_at",
        type: "datetime",
    })
    updatedAt: Date;
}

export class Dated {
    @Column((type) => CreatedTimestamp)
    createdAt: CreatedTimestamp;

    @Column((type) => UpdatedTimestamp)
    updatedAt: UpdatedTimestamp;
}
