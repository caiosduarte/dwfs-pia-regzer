import {
    Column,
    CreateDateColumn,
    JoinColumn,
    JoinTable,
    OneToOne,
    UpdateDateColumn,
} from "typeorm";
import Company from "./Company";
import Individual from "./Individual";

export class PersonType {
    // @Column((type) => CreatedTimestamp, { prefix: false })
    // createdTimestamp: CreatedTimestamp;

    @Column({ name: "type" })
    type: string;

    // @OneToOne((type) => Individual | Company, { cascade: true })
    // @JoinColumn([
    //     { name: "person_id" },
    //     { name: "type", referencedColumnName: "type" },
    // ])
    // Person: Individual | Company;
}
